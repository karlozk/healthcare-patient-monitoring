pipeline {
    agent any

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t karlozk/healthcare-portal:latest .'
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                sh 'docker push karlozk/healthcare-portal:latest'
            }
        }
    }
}
