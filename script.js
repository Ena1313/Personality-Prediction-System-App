document.getElementById('predictionForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = document.getElementById('age').value;
    const openness = document.querySelector('input[name="openness"]:checked').value;
    const neuroticism = document.querySelector('input[name="neuroticism"]:checked').value;
    const conscientiousness = document.querySelector('input[name="conscientiousness"]:checked').value;
    const agreeableness = document.querySelector('input[name="agreeableness"]:checked').value;
    const extraversion = document.querySelector('input[name="extraversion"]:checked').value;

    const data = {
        Inputs: {
            data: [
                {
                    Gender: gender,
                    Age: parseInt(age),
                    openness: parseInt(openness),
                    neuroticism: parseInt(neuroticism),
                    conscientiousness: parseInt(conscientiousness),
                    agreeableness: parseInt(agreeableness),
                    extraversion: parseInt(extraversion)
                }
            ]
        },
        GlobalParameters: {
            method: "predict"
        }
    };

    try {
        const response = await fetch('http://1d3a1007-0f5d-4f43-a940-e030af57d09a.northeurope.azurecontainer.io/score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        const prediction = result.Results[0];
        
        let description;
        switch (prediction) {
            case 'dependable':
                description = 'You are dependable. This means that people around you can trust you to follow through on your commitments and responsibilities. You are known for being reliable, and others can count on you to be consistent and stable in both personal and professional situations. Your dependability makes you a trusted friend, colleague, or team member, as you can be relied upon to complete tasks and uphold promises with integrity and dedication.';
                break;
            case 'serious':
                description = 'You are serious. This trait suggests that you approach life with a sense of gravity and thoughtfulness. You tend to reflect deeply on situations and make decisions with careful consideration. Your serious nature often translates into a mature perspective, where you prioritize responsibilities and handle challenges with a composed demeanor. People often see you as someone who takes matters seriously and approaches tasks with earnestness and dedication.';
                break;
            case 'responsible':
                description = 'You are responsible. This quality indicates that you take ownership of your actions and commitments. You are dependable in fulfilling your duties and are seen as someone who can be counted on to meet obligations. Your sense of responsibility means you are conscientious about your tasks and decisions, ensuring that you act with reliability and integrity. Others view you as a key individual who takes their role seriously and can be trusted to deliver on promises and responsibilities.';
                break;
            case 'lively':
                description = 'You are lively. This means you bring a dynamic energy and enthusiasm into your interactions. Your vibrant personality is often characterized by an eagerness to engage with the world and a positive outlook on life. You are likely to inspire those around you with your spirited approach and zest for new experiences. Your liveliness makes you a source of joy and motivation, contributing to an upbeat and energetic atmosphere wherever you go.';
                break;
            case 'extraverted':
                description = 'You are extraverted. This trait reflects your comfort and enjoyment in social interactions. You thrive in environments where you can engage with others and are often energized by social activities. Your outgoing nature means you are likely to seek out social experiences and build strong relationships with people. Being extraverted often involves being enthusiastic and expressive, making you a dynamic and engaging presence in group settings.';
                break;
            default:
                description = 'An error occurred. Please try again.';
        }

        document.getElementById('modalResult').innerHTML = `
            <p><strong>Prediction:</strong> ${prediction}</p>
            <p>${description}</p>
        `;
        document.getElementById('resultModal').style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('modalResult').innerText = 'An error occurred. Please try again.';
        document.getElementById('resultModal').style.display = 'block';
    }
});

document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('resultModal').style.display = 'none';
});

document.getElementById('takeTestAgain').addEventListener('click', () => {
    document.getElementById('resultModal').style.display = 'none';
    document.getElementById('predictionForm').reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('click', (event) => {
    if (event.target == document.getElementById('resultModal')) {
        document.getElementById('resultModal').style.display = 'none';
    }
});
