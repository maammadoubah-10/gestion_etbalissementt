pipeline {
    agent any  // Utilise n'importe quel agent disponible

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/maammadoubah-10/gestion_etbalissementt.git'
            }
        }

        stage('Build devops') {
            steps {
                script {
                    dir('devops') {
                        sh 'composer install'
                    }
                }
            }
        }

        stage('Build angular') {
            steps {
                script {
                    dir('angular/gestion-ecole') {
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Tests devops') {
            steps {
                script {
                    dir('devops') {
                        sh 'php artisan test'
                    }
                }
            }
        }

        stage('Tests angular') {
            steps {
                script {
                    dir('angular/gestion-ecole') {
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    sh 'docker-compose build'
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}
