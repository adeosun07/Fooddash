// Mock rider data - will be replaced with real API calls later
const mockRiders = [
  {
    id: '1',
    fullName: 'Musa Ibrahim',
    bikeType: 'Honda CB150',
    bikePlateNumber: 'AGL-234-KJ',
    phone: '+234 803 456 7890',
    rating: 4.8,
  },
  {
    id: '2',
    fullName: 'Chioma Okafor',
    bikeType: 'Yamaha YBR125',
    bikePlateNumber: 'LSD-567-XY',
    phone: '+234 805 123 4567',
    rating: 4.9,
  },
  {
    id: '3',
    fullName: 'Akinola Tunde',
    bikeType: 'Bajaj Boxer',
    bikePlateNumber: 'EPE-891-MN',
    phone: '+234 807 890 1234',
    rating: 4.7,
  },
  {
    id: '4',
    fullName: 'Blessing Adeyemi',
    bikeType: 'TVS Apache',
    bikePlateNumber: 'IKJ-445-RS',
    phone: '+234 809 234 5678',
    rating: 4.6,
  },
];

// Get a random rider for order assignment (simulating assignment)
export const assignRiderToOrder = async () => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * mockRiders.length);
      resolve(mockRiders[randomIndex]);
    }, 500);
  });
};

// Get rider by ID
export const getRiderById = async (riderId) => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const rider = mockRiders.find(r => r.id === riderId);
      resolve(rider || null);
    }, 300);
  });
};

// Get all available riders
export const getAvailableRiders = async () => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRiders);
    }, 500);
  });
};

// Simulate rider location tracking
// This simulates a rider moving from vendor to customer location
export const simulateRiderLocation = (startLat, startLng, endLat, endLng, onLocationUpdate) => {
  // Calculate total steps (simulate movement over 5 minutes with updates every 3 seconds)
  const totalSteps = 100;
  const intervalTime = 3000; // 3 seconds
  let currentStep = 0;

  const interval = setInterval(() => {
    if (currentStep >= totalSteps) {
      clearInterval(interval);
      // Send final location
      onLocationUpdate({
        latitude: endLat,
        longitude: endLng,
        progress: 100,
        arrived: true,
      });
      return;
    }

    // Calculate current position (linear interpolation)
    const progress = currentStep / totalSteps;
    const currentLat = startLat + (endLat - startLat) * progress;
    const currentLng = startLng + (endLng - startLng) * progress;

    // Add some random variation to make it more realistic
    const randomOffsetLat = (Math.random() - 0.5) * 0.0001;
    const randomOffsetLng = (Math.random() - 0.5) * 0.0001;

    onLocationUpdate({
      latitude: currentLat + randomOffsetLat,
      longitude: currentLng + randomOffsetLng,
      progress: Math.round(progress * 100),
      arrived: false,
    });

    currentStep++;
  }, intervalTime);

  // Return a function to stop tracking
  return () => clearInterval(interval);
};

// Get estimated time based on distance (simple calculation)
export const getEstimatedDeliveryTime = (distanceInKm) => {
  // Assume average speed of 20 km/h for bike in campus
  const hours = distanceInKm / 20;
  const minutes = Math.ceil(hours * 60);
  return minutes;
};

// Generate random OTP for order verification
export const generateOrderOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};
