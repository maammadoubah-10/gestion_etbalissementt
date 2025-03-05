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
                    def services = ['ms-classes', 'ms-professeurs', 'ms-emplois', 'ms-cours', 'ms-etudiants']
                    for (service in services) {
                        dir("devops/${service}") {
                            sh '''
                                echo "📌 Nettoyage et mise à jour des dépendances Laravel..."
                                composer clear-cache
                                composer install --no-interaction --prefer-dist --no-scripts --no-progress
                                composer dump-autoload --optimize
                            '''
                        }
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
                        sh 'php artisan test || echo "⚠️ Les tests Laravel ont échoué !"'
                    }
                }
            }
        }

        stage('Tests angular') {
            steps {
                script {
                    dir('angular/gestion-ecole') {
                        sh 'npm test || echo "⚠️ Les tests Angular ont échoué !"'
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
