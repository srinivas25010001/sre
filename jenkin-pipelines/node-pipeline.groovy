pipeline {
    agent any
     tools {
        nodejs 'node18'  
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/cubastion-training/sample-node-app.git'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
               
            }
        }
        stage('Test') {
            steps {
                //sh 'npm test'
                echo "Build Successfully"
            }
        }
    }
}
