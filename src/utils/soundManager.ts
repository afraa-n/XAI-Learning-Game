const sounds = {
  click: new Audio('/assets/sounds/click.mp3'),
  prediction: new Audio('/assets/sounds/prediction.mp3'),
  success: new Audio('/assets/sounds/success.mp3'),
  unlock: new Audio('/assets/sounds/unlock.mp3'),
};

export const playSound = (soundName: keyof typeof sounds) => {
  sounds[soundName].play().catch(error => console.error('Error playing sound:', error));
};