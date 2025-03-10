pipeline {
    agent any
    tools {
        nodejs 'node18'  // Use the NodeJS installation configured in Jenkins
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/cubastion-training/sample-react-app.git'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
                echo "Build Successfully"
            }
        }
        stage('Test') {
            steps {
               sh 'npm start'
               echo "Tested successfully"
            }
        }
    }
}
