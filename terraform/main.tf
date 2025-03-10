terraform { 
  required_providers { 
    azurerm = { 
      source  = "hashicorp/azurerm" 
      version = "3.102.0" 
    } 
  } 
} 

provider "azurerm" { 
  features {} 
} 

resource "azurerm_resource_group" "example" {
  name     = "sre-resourcegp"
  location = "West Europe"
}

resource "azurerm_virtual_network" "example" {
  name                = "sre-network"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  address_space       = ["10.254.0.0/16"]
}

resource "azurerm_subnet" "aks" {
  name                 = "aks-subnet"
  resource_group_name  = azurerm_resource_group.example.name
  virtual_network_name = azurerm_virtual_network.example.name
  address_prefixes     = ["10.254.0.0/24"]
}

resource "azurerm_subnet" "appgw" {
  name                 = "appgw-subnet"
  resource_group_name  = azurerm_resource_group.example.name
  virtual_network_name = azurerm_virtual_network.example.name
  address_prefixes     = ["10.254.1.0/24"]
}

resource "azurerm_public_ip" "example" {
  name                = "example-pip"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  allocation_method   = "Static"
  sku                 = "Standard"  
}

locals {
  backend_address_pool_name      = "${azurerm_virtual_network.example.name}-beap"
  frontend_port_name             = "${azurerm_virtual_network.example.name}-feport"
  frontend_ip_configuration_name = "${azurerm_virtual_network.example.name}-feip"
  http_setting_name              = "${azurerm_virtual_network.example.name}-be-htst"
  listener_name                  = "${azurerm_virtual_network.example.name}-httplstn"
  request_routing_rule_name      = "${azurerm_virtual_network.example.name}-rqrt"
}

resource "azurerm_application_gateway" "network" {
  name                = "sre-appgateway"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location

  sku {
    name     = "Standard_v2"
    tier     = "Standard_v2"
    capacity = 2
  }

  gateway_ip_configuration {
    name      = "my-gateway-ip-configuration"
    subnet_id = azurerm_subnet.appgw.id
  }

  frontend_port {
    name = local.frontend_port_name
    port = 80
  }

  frontend_ip_configuration {
    name                 = local.frontend_ip_configuration_name
    public_ip_address_id = azurerm_public_ip.example.id
  }

  backend_address_pool {
    name = local.backend_address_pool_name
  }

  backend_http_settings {
    name                  = local.http_setting_name
    cookie_based_affinity = "Disabled"
    port                  = 80
    protocol              = "Http"
    request_timeout       = 60
  }

  http_listener {
    name                           = local.listener_name
    frontend_ip_configuration_name = local.frontend_ip_configuration_name
    frontend_port_name             = local.frontend_port_name
    protocol                       = "Http"
  }

  request_routing_rule {
    name                       = local.request_routing_rule_name
    priority                   = 9
    rule_type                  = "Basic"
    http_listener_name         = local.listener_name
    backend_address_pool_name  = local.backend_address_pool_name
    backend_http_settings_name = local.http_setting_name
  }
}

resource "azurerm_private_dns_zone" "example" {
  name                = "privatelink.westeurope.azmk8s.io"  
  resource_group_name = azurerm_resource_group.example.name
}

resource "azurerm_user_assigned_identity" "example" {
  name                = "aks-example-identity"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
}

resource "azurerm_role_assignment" "example" {
  scope                = azurerm_private_dns_zone.example.id
  role_definition_name = "Private DNS Zone Contributor"
  principal_id         = azurerm_user_assigned_identity.example.principal_id
}

resource "azurerm_kubernetes_cluster" "example" {
  name                    = "sre-aks"
  location                = azurerm_resource_group.example.location
  resource_group_name     = azurerm_resource_group.example.name
  dns_prefix              = "aksexamplednsprefix1"
  private_cluster_enabled = true 
  private_dns_zone_id = azurerm_private_dns_zone.example.id
  default_node_pool {
    name       = "system"
    node_count = 2
    vm_size    = "Standard_D2s_v3"
  }

  identity {
    type         = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.example.id]
  }

  depends_on = [
    azurerm_role_assignment.example,
  ]
}
