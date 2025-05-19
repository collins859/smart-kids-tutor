
 // 🍔 Mobile Menu Toggle
        document.getElementById('mobile-menu-btn').addEventListener('click', function() {
            document.getElementById('nav-links').classList.toggle('active');
            this.innerHTML = this.innerHTML.includes('bars') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // 🧒 Age Group Selection
        document.querySelectorAll('.age-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.age-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Update character speech based on age group
                const age = this.dataset.age;
                let message = "Hello explorer! Ready for a learning adventure?";
                
                if (age === '3-5') {
                    message = "Hi little friend! Let's play and learn together!";
                    document.getElementById('tutor-character').src = "https://cdn.pixabay.com/photo/2020/05/18/16/17/social-media-5187243_960_720.png";
                } else if (age === '6-8') {
                    message = "Hello explorer! Ready for a learning adventure?";
                    document.getElementById('tutor-character').src = "https://cdn.pixabay.com/photo/2021/08/04/13/06/robot-6521720_960_720.png";
                } else if (age === '9-12') {
                    message = "Welcome back! What challenge shall we tackle today?";
                    document.getElementById('tutor-character').src = "https://cdn.pixabay.com/photo/2017/01/31/15/33/robot-2025572_960_720.png";
                }
                
                document.getElementById('speech-bubble').textContent = message;
                
                // Trigger character animation
                const character = document.getElementById('tutor-character');
                character.classList.remove('character-wave');
                void character.offsetWidth; // Trigger reflow
                character.classList.add('character-wave');
                
                // Rainbow confetti for age selection
                createConfetti(30);
            });
        });
        
        // 🔍 Subject Search API Integration
        document.getElementById('search-btn').addEventListener('click', async function() {
            const query = document.getElementById('subject-search-input').value;
            const ageGroup = document.querySelector('.age-btn.active').dataset.age;
            
            if (!query) {
                // Shake animation for empty search
                const input = document.getElementById('subject-search-input');
                input.style.animation = 'none';
                void input.offsetWidth; // Trigger reflow
                input.style.animation = 'shake 0.5s';
                
                // Add temporary shake animation
                const style = document.createElement('style');
                style.innerHTML = `
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        20%, 60% { transform: translateX(-5px); }
                        40%, 80% { transform: translateX(5px); }
                    }
                `;
                document.head.appendChild(style);
                setTimeout(() => document.head.removeChild(style), 500);
                
                return;
            }
            
            // Show loading screen
            document.getElementById('loading-screen').classList.remove('hidden');
            
            try {
                // Simulating API response for demo
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                const mockResults = [
                    {
                        id: 1,
                        title: `Basic ${query} for Ages ${ageGroup}`,
                        description: `A fun introduction to ${query} designed specifically for ${ageGroup} year olds. Includes interactive games and activities.`,
                        subject: query.toLowerCase()
                    },
                    {
                        id: 2,
                        title: `${query} Adventure Game`,
                        description: `Learn ${query} through an exciting adventure story with puzzles to solve.`,
                        subject: query.toLowerCase()
                    },
                    {
                        id: 3,
                        title: `${query} Quiz Challenge`,
                        description: `Test your knowledge with this interactive quiz about ${query}.`,
                        subject: query.toLowerCase()
                    }
                ];
                
                const resultsContainer = document.getElementById('search-results');
                resultsContainer.innerHTML = mockResults.map(result => `
                    <div class="search-result">
                        <h4>${result.title}</h4>
                        <p>${result.description}</p>
                        <button class="start-lesson" data-id="${result.id}">
                            <i class="fas fa-play"></i> Start Learning
                        </button>
                    </div>
                `).join('');
                
                // Add click handlers to the lesson buttons
                document.querySelectorAll('.start-lesson').forEach(btn => {
                    btn.addEventListener('click', function() {
                        startLesson(this.dataset.id);
                    });
                });
                
            } catch (error) {
                console.error('Search error:', error);
                document.getElementById('search-results').innerHTML = `
                    <div class="search-error">
                        <p>Oops! We couldn't load the results right now. Please try again later.</p>
                    </div>
                `;
            } finally {
                // Hide loading screen
                document.getElementById('loading-screen').classList.add('hidden');
            }
        });
        
        function startLesson(lessonId) {
            // Show loading screen
            document.getElementById('loading-screen').classList.remove('hidden');
            
            // In a real app, this would redirect to the lesson page
            // or load the lesson content dynamically
            setTimeout(() => {
                // Rainbow confetti for lesson start
                createConfetti(50);
                
                // Show success message
                const speechBubble = document.getElementById('speech-bubble');
                speechBubble.innerHTML = `Let's begin Lesson ${lessonId}! <i class="fas fa-smile-beam"></i>`;
                
                // Hide loading screen
                document.getElementById('loading-screen').classList.add('hidden');
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 2000);
        }
        
        // ➕ Interactive Math Problem
        document.getElementById('check-answer').addEventListener('click', function() {
            const answerBox = document.getElementById('answer-box');
            answerBox.textContent = "8";
            answerBox.classList.add('correct-answer');
            
            // Change the button
            this.innerHTML = '<i class="fas fa-check"></i> Correct! 🎉';
            this.style.background = 'linear-gradient(135deg, var(--yellow-sun) 0%, var(--green-mint) 100%)';
            
            // Create confetti
            createConfetti(100);
            
            // Update progress bar
            const progressFill = document.querySelector('.progress-fill');
            const newWidth = Math.min(100, parseFloat(progressFill.style.width) + 10);
            progressFill.style.width = newWidth + '%';
            
            // Update stars if needed
            if (newWidth >= 33) document.querySelectorAll('.star')[0].classList.add('active');
            if (newWidth >= 66) document.querySelectorAll('.star')[1].classList.add('active');
            if (newWidth >= 99) document.querySelectorAll('.star')[2].classList.add('active');
        });
        
        // Allow clicking on answer box to reveal answer
        document.getElementById('answer-box').addEventListener('click', function() {
            if (this.textContent === "?") {
                this.textContent = "8";
                this.classList.add('correct-answer');
                createConfetti(30);
            }
        });
        
        function createConfetti(count = 50) {
            // Create confetti pieces
            for (let i = 0; i < count; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                // Random position
                confetti.style.left = Math.random() * 100 + 'vw';
                
                // Random rainbow color
                const hue = Math.floor(Math.random() * 360);
                confetti.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
                
                // Random shape (circle or square)
                if (Math.random() > 0.5) {
                    confetti.style.borderRadius = '50%';
                    confetti.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
                } else {
                    confetti.style.borderRadius = '0';
                }
                
                // Random size
                const size = Math.random() * 15 + 5;
                confetti.style.width = `${size}px`;
                confetti.style.height = `${size}px`;
                
                // Random animation duration
                const duration = Math.random() * 3 + 2;
                confetti.style.animationDuration = `${duration}s`;
                
                document.body.appendChild(confetti);
                
                // Remove after animation
                setTimeout(() => {
                    confetti.remove();
                }, duration * 1000);
            }
        }
        
        // Create floating bubbles in header
        function createBubbles() {
            const bubbleContainer = document.getElementById('header-bubbles');
            const bubbleCount = 15;
            
            for (let i = 0; i < bubbleCount; i++) {
                const bubble = document.createElement('div');
                bubble.className = 'bubble';
                
                // Random size between 20 and 60px
                const size = Math.random() * 40 + 20;
                bubble.style.width = `${size}px`;
                bubble.style.height = `${size}px`;
                
                // Random position
                bubble.style.left = `${Math.random() * 100}%`;
                bubble.style.bottom = `-${size}px`;
                
                // Random animation duration between 10s and 20s
                const duration = Math.random() * 10 + 10;
                bubble.style.animationDuration = `${duration}s`;
                
                // Random delay
                bubble.style.animationDelay = `${Math.random() * 5}s`;
                
                // Random opacity
                bubble.style.opacity = Math.random() * 0.5 + 0.3;
                
                bubbleContainer.appendChild(bubble);
            }
        }
        
        // Initialize when page loads
        window.addEventListener('DOMContentLoaded', () => {
            createBubbles();
            
            // Simulate loading time
            setTimeout(() => {
                document.getElementById('loading-screen').classList.add('hidden');
                
                // Welcome animation
                createConfetti(30);
                const character = document.getElementById('tutor-character');
                character.style.animation = 'bounce 0.5s ease 3';
                
                // Set up subject card hover effects
                document.querySelectorAll('.subject-card').forEach(card => {
                    card.addEventListener('mouseenter', () => {
                        card.style.transform = 'perspective(500px) rotateY(15deg) scale(1.05)';
                    });
                    card.addEventListener('mouseleave', () => {
                        card.style.transform = 'perspective(500px) rotateY(0) scale(1)';
                    });
                });
            }, 2500);
        });

        // Example using free sound files
const poemSongs = {
    abc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    numbers: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    animals: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
};

// Add this to your existing JavaScript
// Update the poemCards.forEach loop to include lyrics display
poemCards.forEach((card, index) => {
    const playBtn = card.querySelector('.play-btn');
    const audio = card.querySelector('audio');
    const poemId = card.dataset.poem;
    
    playBtn.addEventListener('click', function() {
        // ... existing play/pause logic ...
        
        // Show lyrics for current poem
        document.querySelectorAll('.lyrics-container').forEach(container => {
            container.style.display = 'none';
        });
        document.querySelector(`.lyrics-container[data-poem="${poemId}"]`).style.display = 'block';
        
        // Animate lyrics
        const lyricsContainer = document.querySelector(`.lyrics-container[data-poem="${poemId}"]`);
        const lyricsLines = lyricsContainer.querySelectorAll('.lyrics p');
        lyricsLines.forEach(line => {
            line.style.animation = 'none';
            void line.offsetWidth; // Trigger reflow
            line.style.animation = 'slideIn 0.5s forwards';
        });
    });
});