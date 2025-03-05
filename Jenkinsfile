pipeline {
    agent any 

    environment {
        IMAGE_PREFIX = "mamadouba634"  // Remplace par ton DockerHub username
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/maammadoubah-10/gestion_etbalissementt.git'
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                script {
                    def services = ['ms-classes', 'ms-professeurs', 'ms-emplois', 'ms-cours', 'ms-etudiants']
                    for (service in services) {
                        dir("devops/${service}") {
                            sh """
                                echo "📌 Construction de l'image Docker pour ${service}..."
                                docker build -t ${env.IMAGE_PREFIX}/${service}:latest .
                                echo "📌 Push de l'image sur DockerHub..."
                                docker login -u "mamadouba634" -p "momoba2000"
                                docker push ${env.IMAGE_PREFIX}/${service}:latest
                            """
                        }
                    }
                }
            }
        }

        stage('Deploy Docker Containers') {
            steps {
                script {
                    def services = ['ms-classes', 'ms-professeurs', 'ms-emplois', 'ms-cours', 'ms-etudiants']
                    for (service in services) {
                        sh """
                            echo "📌 Démarrage du conteneur ${service}..."
                            docker run -d --name ${service} -p 8080:80 ${env.IMAGE_PREFIX}/${service}:latest
                        """
                    }
                }
            }
        }
    }
}
