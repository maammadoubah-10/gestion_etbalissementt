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
            def services = ['ms-classes', 'ms-cours', 'ms-etudiants', 'ms-professeurs', 'ms-emplois']
            services.each { service ->
                dir("devops/${service}") {
                    sh '''
                    if [ -f composer.json ]; then
                        composer install --no-interaction --prefer-dist
                    else
                        echo "composer.json non trouvé pour ${service}, vérifiez le dépôt !"
                        exit 1
                    fi
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
