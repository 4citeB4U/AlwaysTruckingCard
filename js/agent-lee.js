/**
 * Agent Lee - Interactive assistant for Always Trucking & Loading LLC
 * Provides engaging information about trucking services and training
 */

class AgentLee {
    constructor() {
        this.name = "Lee";
        this.role = "Always Trucking Assistant";
        this.isActive = false;
        this.isSpeaking = false;
        this.avatarImage = "lmlz7zis45.png";
        
        // Predefined messages for different interactions
        this.greetings = [
            "Hi! I'm Lee from Always Trucking. Interested in becoming a professional driver?",
            "Hello! I'm Lee, your Always Trucking assistant. How can I help you today?",
            "Welcome! I'm Lee from Always Trucking & Loading. Looking for CDL training?"
        ];
        
        this.faqTopics = [
            {
                question: "What CDL training programs do you offer?",
                answer: "We offer comprehensive CDL Class A and B training programs, refresher courses, and specialized endorsement training for hazardous materials, tankers, and passenger vehicles.",
                cta: "Visit our website for more details!"
            },
            {
                question: "How long does CDL training take?",
                answer: "Our full CDL training typically takes 3-6 weeks, depending on the program and your schedule. We offer both full-time and part-time options to accommodate your needs.",
                cta: "Ready to start your training journey?"
            },
            {
                question: "What are the costs for CDL training?",
                answer: "Our training programs are competitively priced with flexible payment options. We offer financing for qualified students and special rates for veterans.",
                cta: "Contact us for pricing details!"
            },
            {
                question: "Do you help with job placement?",
                answer: "Absolutely! We have strong relationships with trucking companies across the region and provide job placement assistance to help you start your new career.",
                cta: "Start your new career today!"
            },
            {
                question: "Who is the instructor?",
                answer: "Our lead instructor is Anthony, who brings over 15 years of industry experience to the classroom. He's a certified instructor passionate about training professional drivers.",
                cta: "Learn from the best in the industry!"
            }
        ];
    }

    // Initialize the agent on the page
    initialize() {
        // Create agent container if it doesn't exist
        if (!document.getElementById('agent-lee')) {
            this.createAgentElement();
            this.addEventListeners();
            
            // Begin speaking after a short delay
            setTimeout(() => {
                this.speak(this.getRandomItem(this.greetings));
            }, 1000);
        }
    }

    // Create the agent element in the DOM
    createAgentElement() {
        const agentContainer = document.createElement('div');
        agentContainer.id = 'agent-lee';
        agentContainer.className = 'agent-lee';
        
        // Create HTML for agent
        agentContainer.innerHTML = `
            <div class="agent-card">
                <div class="agent-header">
                    <div class="agent-avatar">
                        <img src="${this.avatarImage}" alt="Agent Lee">
                    </div>
                    <div class="agent-info">
                        <h3>Agent Lee</h3>
                        <p>Always Trucking Assistant</p>
                    </div>
                    <button class="minimize-agent" title="Minimize">_</button>
                </div>
                
                <div class="agent-body">
                    <div class="speech-bubble">
                        <p id="agent-speech"></p>
                        <div class="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    
                    <div class="agent-controls">
                        <button class="control-button stop-speaking" title="Stop Speaking">
                            <i class="fas fa-volume-mute"></i>
                        </button>
                        <button class="control-button speak-again" title="Speak Again">
                            <i class="fas fa-volume-up"></i>
                        </button>
                    </div>
                    
                    <div class="common-questions">
                        <h4>Ask about:</h4>
                        <div class="question-buttons">
                            <!-- Question buttons will be added here dynamically -->
                        </div>
                    </div>
                </div>
                
                <div class="agent-footer">
                    <div class="action-links">
                        <a href="tel:4149827034" class="action-link phone-link">
                            <i class="fas fa-phone"></i> Call Us
                        </a>
                        <a href="mailto:Anthony@alwaystruckingandloading.com" class="action-link email-link">
                            <i class="fas fa-envelope"></i> Email Us
                        </a>
                        <a href="http://alwaystruckingandloading.com" target="_blank" class="action-link website-link">
                            <i class="fas fa-globe"></i> Website
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        // Add to the page
        document.body.appendChild(agentContainer);
        
        // Add FAQ topic buttons
        const topicContainer = agentContainer.querySelector('.question-buttons');
        this.faqTopics.forEach((topic, index) => {
            const button = document.createElement('button');
            button.className = 'question-button';
            button.textContent = topic.question;
            button.dataset.topicIndex = index;
            topicContainer.appendChild(button);
        });
    }

    // Add event listeners for agent interactions
    addEventListeners() {
        // Minimize/maximize agent
        const minimizeBtn = document.querySelector('.minimize-agent');
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => {
                const agentCard = document.querySelector('.agent-card');
                agentCard.classList.toggle('minimized');
                
                // Update button text and title
                if (agentCard.classList.contains('minimized')) {
                    minimizeBtn.textContent = '+';
                    minimizeBtn.title = 'Maximize';
                } else {
                    minimizeBtn.textContent = '_';
                    minimizeBtn.title = 'Minimize';
                }
            });
        }
        
        // FAQ topic buttons
        const questionButtons = document.querySelectorAll('.question-button');
        questionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const topicIndex = button.dataset.topicIndex;
                const topic = this.faqTopics[topicIndex];
                this.speak(`${topic.answer} ${topic.cta}`);
                
                // Highlight the selected button
                document.querySelectorAll('.question-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
            });
        });
        
        // Stop speaking button
        const stopSpeakingBtn = document.querySelector('.stop-speaking');
        if (stopSpeakingBtn) {
            stopSpeakingBtn.addEventListener('click', () => {
                this.stopSpeaking();
            });
        }
        
        // Speak again button
        const speakAgainBtn = document.querySelector('.speak-again');
        if (speakAgainBtn) {
            speakAgainBtn.addEventListener('click', () => {
                const speechText = document.getElementById('agent-speech').textContent;
                if (speechText) {
                    this.speak(speechText, true);
                } else {
                    this.speak(this.getRandomItem(this.greetings));
                }
            });
        }
    }

    // Speak a message with typing animation
    speak(message, skipTyping = false) {
        // Cancel any ongoing speech
        this.stopSpeaking();
        
        this.isSpeaking = true;
        
        // Get speech element and typing indicator
        const speechElement = document.getElementById('agent-speech');
        const typingIndicator = document.querySelector('.typing-indicator');
        
        if (skipTyping) {
            // Skip typing animation
            speechElement.textContent = message;
            this.speakAudio(message);
        } else {
            // Show typing indicator
            speechElement.textContent = '';
            typingIndicator.style.display = 'flex';
            
            // Simulate typing delay (shorter)
            setTimeout(() => {
                // Hide typing indicator and show message
                typingIndicator.style.display = 'none';
                speechElement.textContent = message;
                
                // Speak the message
                this.speakAudio(message);
            }, 800);
        }
    }
    
    // Use speech synthesis to speak the message
    speakAudio(message) {
        // Use speech synthesis if available
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(message);
            speech.rate = 1;
            speech.pitch = 1;
            speech.volume = 1;
            
            // Get voices and select a friendly one
            let voices = speechSynthesis.getVoices();
            if (voices.length === 0) {
                // If voices aren't loaded yet, wait for them
                speechSynthesis.onvoiceschanged = () => {
                    voices = speechSynthesis.getVoices();
                    speech.voice = this.selectVoice(voices);
                    window.speechSynthesis.speak(speech);
                };
            } else {
                speech.voice = this.selectVoice(voices);
                window.speechSynthesis.speak(speech);
            }
            
            // When speech ends
            speech.onend = () => {
                this.isSpeaking = false;
            };
        } else {
            // No speech synthesis available
            setTimeout(() => {
                this.isSpeaking = false;
            }, 3000);
        }
    }
    
    // Stop any ongoing speech
    stopSpeaking() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        this.isSpeaking = false;
    }

    // Select a good voice for the agent
    selectVoice(voices) {
        // Prefer these voices in order
        const preferredVoices = [
            'Google US English Female',
            'Microsoft Zira Desktop',
            'Samantha',
            'Google US English'
        ];
        
        // Try to find a preferred voice
        for (const preferred of preferredVoices) {
            const match = voices.find(voice => voice.name.includes(preferred));
            if (match) return match;
        }
        
        // Fall back to any English voice
        const englishVoice = voices.find(voice => voice.lang.startsWith('en-'));
        if (englishVoice) return englishVoice;
        
        // Last resort: first available voice
        return voices[0];
    }

    // Get a random item from an array
    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
}

// Initialize agent when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Remove the common questions button if it exists
    const commonQuestionsButton = document.querySelector('.faq-button');
    if (commonQuestionsButton) {
        commonQuestionsButton.remove();
    }
    
    // Add Agent Lee's CSS
    const style = document.createElement('style');
    style.textContent = `
        .agent-lee {
            position: relative;
            z-index: 1000;
            width: 380px;
            height: 700px;
            font-family: 'Roboto', sans-serif;
            animation: floatUp 1.5s ease-out forwards 0.3s, softFloat 4s ease-in-out infinite 1.8s;
            transform: translateY(50px);
            opacity: 0;
        }
        
        .agent-card {
            background-color: #2c2c2c;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            overflow: hidden;
            transition: all 0.3s ease;
            height: 100%;
            display: flex;
            flex-direction: column;
            position: relative;
        }
        
        .agent-card::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 20%;
            background: linear-gradient(0deg, rgba(215, 201, 161, 0.1) 0%, transparent 100%);
            z-index: 1;
            animation: cardReflection 5s ease-in-out infinite 1s;
            opacity: 0.5;
        }
        
        .agent-card.minimized {
            height: 60px;
            overflow: hidden;
        }
        
        .agent-header {
            display: flex;
            align-items: center;
            padding: 15px;
            background-color: #1e1e1e;
            border-bottom: 1px solid #3a3a3a;
        }
        
        .agent-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 10px;
            border: 2px solid #d7c9a1;
        }
        
        .agent-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .agent-info {
            flex: 1;
        }
        
        .agent-info h3 {
            margin: 0;
            color: #d7c9a1;
            font-size: 16px;
        }
        
        .agent-info p {
            margin: 0;
            color: #999;
            font-size: 12px;
        }
        
        .minimize-agent {
            background: none;
            border: none;
            color: #d7c9a1;
            font-size: 18px;
            cursor: pointer;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
        }
        
        .minimize-agent:hover {
            background-color: rgba(215, 201, 161, 0.1);
        }
        
        .agent-body {
            padding: 15px;
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        
        .speech-bubble {
            background-color: #d7c9a1;
            color: #2c2c2c;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 15px;
            position: relative;
            min-height: 70px;
            animation: pulseSpeech 3s ease-in-out infinite;
        }
        
        .speech-bubble:after {
            content: '';
            position: absolute;
            left: 15px;
            bottom: -10px;
            border-width: 10px 10px 0;
            border-style: solid;
            border-color: #d7c9a1 transparent transparent;
        }
        
        @keyframes pulseSpeech {
            0%, 100% {
                box-shadow: 0 0 0 0 rgba(215, 201, 161, 0.1);
            }
            50% {
                box-shadow: 0 0 10px 0 rgba(215, 201, 161, 0.3);
            }
        }
        
        .typing-indicator {
            display: none;
            justify-content: center;
            gap: 5px;
        }
        
        .typing-indicator span {
            width: 8px;
            height: 8px;
            background-color: #2c2c2c;
            border-radius: 50%;
            display: inline-block;
            animation: pulse 1.5s infinite ease-in-out;
        }
        
        .typing-indicator span:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .typing-indicator span:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(0.7); opacity: 0.5; }
            50% { transform: scale(1); opacity: 1; }
        }
        
        .agent-controls {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .control-button {
            background-color: #3a3a3a;
            color: #d7c9a1;
            border: none;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .control-button:hover {
            background-color: #4a4a4a;
            transform: translateY(-2px);
        }
        
        .common-questions {
            margin-top: 15px;
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        
        .common-questions h4 {
            color: #d7c9a1;
            margin: 0 0 10px 0;
            font-size: 14px;
            text-align: center;
        }
        
        .question-buttons {
            display: flex;
            flex-direction: column;
            gap: 8px;
            flex: 1;
            overflow-y: auto;
        }
        
        .question-button {
            background-color: #3a3a3a;
            color: #d7c9a1;
            border: none;
            border-radius: 8px;
            padding: 10px;
            text-align: left;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 13px;
        }
        
        .question-button:hover, .question-button.active {
            background-color: #4a4a4a;
            transform: translateX(5px);
        }
        
        .question-button.active {
            border-left: 3px solid #d7c9a1;
        }
        
        .agent-footer {
            padding: 15px;
            border-top: 1px solid #3a3a3a;
        }
        
        .action-links {
            display: flex;
            justify-content: space-between;
        }
        
        .action-link {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #d7c9a1;
            text-decoration: none;
            font-size: 12px;
            padding: 5px;
            transition: all 0.2s ease;
        }
        
        .action-link i {
            font-size: 20px;
            margin-bottom: 5px;
        }
        
        .action-link:hover {
            transform: translateY(-3px);
            color: #e2d8bd;
        }
        
        .phone-link:hover {
            color: #4cd964;
            animation: pulseIcon 1s ease infinite;
        }
        
        .email-link:hover {
            color: #5ac8fa;
            animation: pulseIcon 1s ease infinite;
        }
        
        .website-link:hover {
            color: #e74c3c;
            animation: pulseIcon 1s ease infinite;
        }
        
        @keyframes pulseIcon {
            0% {
                transform: translateY(-3px) scale(1);
            }
            50% {
                transform: translateY(-3px) scale(1.1);
            }
            100% {
                transform: translateY(-3px) scale(1);
            }
        }
        
        @media (max-width: 900px) {
            body {
                flex-direction: column;
                gap: 20px;
                padding: 10px;
            }
            
            .business-card, .agent-lee {
                width: 100%;
                max-width: 380px;
                height: auto;
                min-height: 600px;
            }
        }
        
        @media (max-width: 480px) {
            .business-card, .agent-lee {
                width: 100%;
                height: auto;
                min-height: 550px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Create and initialize Agent Lee
    window.agentLee = new AgentLee();
    window.agentLee.initialize();
});