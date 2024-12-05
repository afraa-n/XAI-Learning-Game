import { Level } from '../types';

export const LEVELS: Level[] = [
  {
    id: 1,
    title: 'Loan Approval',
    description: 'Predict whether to approve or reject a loan application',
    story: 'As a loan officer, you need to evaluate loan applications based on key financial indicators. Review the applicant\'s details and make an informed decision.',
    features: [
      {
        name: 'Annual Income',
        minValue: 25000,
        maxValue: 95000,
        format: (value) => `$${value.toLocaleString()}`,
        weight: 0.3
      },
      {
        name: 'Credit Score',
        minValue: 580,
        maxValue: 820,
        format: (value) => value.toString(),
        weight: 0.35
      },
      {
        name: 'Debt-to-Income Ratio',
        minValue: 15,
        maxValue: 55,
        format: (value) => `${value}%`,
        weight: -0.25
      },
      {
        name: 'Employment Status',
        minValue: 0,
        maxValue: 1,
        format: (value) => value === 1 ? 'Employed' : 'Unemployed',
        weight: 0.1
      }
    ],
    model: (features: number[]) => {
      const [income, creditScore, dti, employment] = features;
      
      // Normalize values
      const normalizedIncome = (income - 25000) / 70000;
      const normalizedCredit = (creditScore - 580) / 240;
      const normalizedDTI = 1 - (dti - 15) / 40; // Invert so higher is better
      const normalizedEmployment = employment;

      const score = (
        normalizedIncome * 0.3 + 
        normalizedCredit * 0.35 + 
        normalizedDTI * 0.25 + 
        normalizedEmployment * 0.1
      );

      return score > 0.6 ? 1 : 0;
    },
    baselineScore: 0.7,
    theme: 'financial',
    difficulty: 'easy',
    requiredScore: 70,
    targetVariable: 'Loan Approval',
    hints: [
      'Higher income and credit score increase approval chances',
      'High debt-to-income ratio decreases approval chances',
      'Employment status affects the final decision'
    ]
  },
  {
    id: 2,
    title: 'Medical Risk Assessment',
    description: 'Predict patient risk level based on health indicators',
    story: 'As a medical professional, you need to assess patient risk levels using key health metrics. Analyze the data and determine the risk level.',
    features: [
      {
        name: 'Blood Pressure',
        minValue: 110,
        maxValue: 160,
        format: (value) => `${value} mmHg`,
        weight: 0.3
      },
      {
        name: 'Cholesterol Level',
        minValue: 150,
        maxValue: 260,
        format: (value) => `${value} mg/dL`,
        weight: 0.25
      },
      {
        name: 'Blood Sugar',
        minValue: 80,
        maxValue: 180,
        format: (value) => `${value} mg/dL`,
        weight: 0.25
      },
      {
        name: 'Age',
        minValue: 25,
        maxValue: 75,
        format: (value) => `${value} years`,
        weight: 0.2
      }
    ],
    model: (features: number[]) => {
      const [bp, cholesterol, bloodSugar, age] = features;
      
      // Normalize and calculate risk based on medical guidelines
      const bpRisk = (bp - 110) / 50;
      const cholesterolRisk = (cholesterol - 150) / 110;
      const bloodSugarRisk = (bloodSugar - 80) / 100;
      const ageRisk = (age - 25) / 50;

      const riskScore = (
        bpRisk * 0.3 +
        cholesterolRisk * 0.25 +
        bloodSugarRisk * 0.25 +
        ageRisk * 0.2
      );

      return riskScore > 0.5 ? 1 : 0;
    },
    baselineScore: 0.6,
    theme: 'medical',
    difficulty: 'medium',
    requiredScore: 75,
    targetVariable: 'Risk Level',
    hints: [
      'Consider blood pressure as a key indicator',
      'Age and cholesterol together affect risk significantly'
    ]
  },
  {
    id: 3,
    title: 'House Price Prediction',
    description: 'Predict house prices based on property features',
    story: 'As a real estate analyst, you need to estimate property values. Examine the house features and predict its market price.',
    features: [
      {
        name: 'Square Footage',
        minValue: 1000,
        maxValue: 3500,
        format: (value) => `${value} sq ft`,
        weight: 0.4
      },
      {
        name: 'Bedrooms',
        minValue: 2,
        maxValue: 5,
        format: (value) => `${value} BR`,
        weight: 0.2
      },
      {
        name: 'Location Score',
        minValue: 3,
        maxValue: 9,
        format: (value) => `${value}/10`,
        weight: 0.3
      },
      {
        name: 'Property Age',
        minValue: 1,
        maxValue: 25,
        format: (value) => `${value} years`,
        weight: -0.1
      }
    ],
    model: (features: number[]) => {
      const [sqft, bedrooms, location, age] = features;
      
      // Base price $200 per sq ft
      const basePrice = sqft * 200;
      
      // Adjustments
      const bedroomAdjustment = bedrooms * 25000;
      const locationMultiplier = 1 + (location - 5) * 0.1;
      const ageDiscount = Math.max(0, 1 - age * 0.01);

      return Math.round(
        (basePrice + bedroomAdjustment) * locationMultiplier * ageDiscount
      );
    },
    baselineScore: 500000,
    theme: 'financial',
    difficulty: 'medium',
    requiredScore: 80,
    targetVariable: 'House Price',
    hints: [
      'Location and square footage are key price drivers',
      'Older properties typically have lower values'
    ]
  },
  {
    id: 4,
    title: 'Customer Churn Prediction',
    description: 'Predict customer churn risk based on behavior patterns',
    story: 'As a customer retention specialist, you need to identify customers at risk of churning. Analyze their behavior patterns and assess the churn risk.',
    features: [
      {
        name: 'Subscription Length',
        minValue: 3,
        maxValue: 36,
        format: (value) => `${value} months`,
        weight: -0.3
      },
      {
        name: 'Monthly Spend',
        minValue: 50,
        maxValue: 250,
        format: (value) => `$${value}`,
        weight: -0.2
      },
      {
        name: 'Support Tickets',
        minValue: 0,
        maxValue: 10,
        format: (value) => value.toString(),
        weight: 0.3
      },
      {
        name: 'Service Usage',
        minValue: 10,
        maxValue: 90,
        format: (value) => `${value}%`,
        weight: -0.2
      }
    ],
    model: (features: number[]) => {
      const [tenure, spend, tickets, usage] = features;
      
      // Normalize and calculate risk factors
      const tenureScore = 1 - (tenure / 36); // Longer tenure = lower risk
      const spendScore = 1 - (spend / 250); // Higher spend = lower risk
      const ticketScore = tickets / 10; // More tickets = higher risk
      const usageScore = 1 - (usage / 100); // Higher usage = lower risk

      const riskScore = (
        tenureScore * 0.3 +
        spendScore * 0.2 +
        ticketScore * 0.3 +
        usageScore * 0.2
      );

      return riskScore > 0.5 ? 1 : 0;
    },
    baselineScore: 0.3,
    theme: 'business',
    difficulty: 'hard',
    requiredScore: 85,
    targetVariable: 'Churn Risk',
    hints: [
      'Longer subscriptions indicate lower churn risk',
      'High support tickets suggest dissatisfaction'
    ]
  },
  {
    id: 5,
    title: 'Energy Consumption Prediction',
    description: 'Predict household energy consumption based on various factors',
    story: 'As an energy analyst, you need to forecast household energy usage. Analyze the factors and predict consumption levels.',
    features: [
      {
        name: 'House Size',
        minValue: 1000,
        maxValue: 3000,
        format: (value) => `${value} sq ft`,
        weight: 0.35
      },
      {
        name: 'Occupants',
        minValue: 1,
        maxValue: 5,
        format: (value) => value.toString(),
        weight: 0.25
      },
      {
        name: 'Appliance Efficiency',
        minValue: 1,
        maxValue: 5,
        format: (value) => `${value} stars`,
        weight: -0.2
      },
      {
        name: 'Season',
        minValue: 1,
        maxValue: 4,
        format: (value) => ['Winter', 'Spring', 'Summer', 'Fall'][value - 1],
        weight: 0.2
      }
    ],
    model: (features: number[]) => {
      const [size, occupants, efficiency, season] = features;
      
      // Base consumption per square foot
      const baseConsumption = size * 0.5;
      
      // Adjustments
      const occupantFactor = 1 + (occupants - 1) * 0.2;
      const efficiencyFactor = 1 - (efficiency - 1) * 0.1;
      const seasonFactor = season === 1 || season === 3 ? 1.2 : 1; // Higher in Winter/Summer

      return Math.round(
        baseConsumption * occupantFactor * efficiencyFactor * seasonFactor
      );
    },
    baselineScore: 1000,
    theme: 'environmental',
    difficulty: 'medium',
    requiredScore: 75,
    targetVariable: 'Monthly kWh',
    hints: [
      'House size strongly affects consumption',
      'Efficient appliances reduce energy use'
    ]
  },
  {
    id: 6,
    title: 'Product Success Prediction',
    description: 'Predict product success based on market indicators',
    story: 'As a product analyst, you need to evaluate new product potential. Analyze market indicators and predict success likelihood.',
    features: [
      {
        name: 'Market Size',
        minValue: 1000000,
        maxValue: 10000000,
        format: (value) => `${(value/1000000).toFixed(1)}M`,
        weight: 0.3
      },
      {
        name: 'Competition Level',
        minValue: 1,
        maxValue: 5,
        format: (value) => `${value}/5`,
        weight: -0.25
      },
      {
        name: 'Innovation Score',
        minValue: 3,
        maxValue: 9,
        format: (value) => `${value}/10`,
        weight: 0.25
      },
      {
        name: 'Price Point',
        minValue: 1,
        maxValue: 5,
        format: (value) => `Tier ${value}`,
        weight: -0.2
      }
    ],
    model: (features: number[]) => {
      const [marketSize, competition, innovation, price] = features;
      
      // Normalize values
      const marketScore = marketSize / 10000000;
      const competitionScore = 1 - (competition - 1) / 4;
      const innovationScore = (innovation - 3) / 6;
      const priceScore = 1 - (price - 1) / 4;

      const successScore = (
        marketScore * 0.3 +
        competitionScore * 0.25 +
        innovationScore * 0.25 +
        priceScore * 0.2
      );

      return successScore > 0.6 ? 1 : 0;
    },
    baselineScore: 0.6,
    theme: 'business',
    difficulty: 'hard',
    requiredScore: 80,
    targetVariable: 'Success Likelihood',
    hints: [
      'Large markets improve success chances',
      'High competition reduces success probability'
    ]
  },
  {
    id: 7,
    title: 'Crop Yield Prediction',
    description: 'Predict crop yield based on environmental conditions',
    story: 'As an agricultural scientist, you need to forecast crop yields. Analyze environmental factors and predict the expected yield.',
    features: [
      {
        name: 'Rainfall',
        minValue: 500,
        maxValue: 1500,
        format: (value) => `${value}mm`,
        weight: 0.3
      },
      {
        name: 'Temperature',
        minValue: 15,
        maxValue: 35,
        format: (value) => `${value}°C`,
        weight: 0.25
      },
      {
        name: 'Soil Quality',
        minValue: 1,
        maxValue: 5,
        format: (value) => `${value}/5`,
        weight: 0.25
      },
      {
        name: 'Pest Pressure',
        minValue: 1,
        maxValue: 5,
        format: (value) => `Level ${value}`,
        weight: -0.2
      }
    ],
    model: (features: number[]) => {
      const [rainfall, temp, soil, pests] = features;
      
      // Optimal conditions
      const optimalRain = 1000;
      const optimalTemp = 25;
      
      // Calculate stress factors
      const rainFactor = 1 - Math.abs(rainfall - optimalRain) / 1000;
      const tempFactor = 1 - Math.abs(temp - optimalTemp) / 20;
      const soilFactor = soil / 5;
      const pestFactor = 1 - (pests - 1) / 4;

      const baseYield = 5000;
      return Math.round(
        baseYield * rainFactor * tempFactor * soilFactor * pestFactor
      );
    },
    baselineScore: 5000,
    theme: 'environmental',
    difficulty: 'medium',
    requiredScore: 75,
    targetVariable: 'Crop Yield (kg/ha)',
    hints: [
      'Optimal rainfall is crucial for yield',
      'High pest pressure significantly reduces yield',
      'Soil quality directly impacts production'
    ]
  },
  {
    id: 8,
    title: 'Software Project Estimation',
    description: 'Predict software project completion time',
    story: 'As a project manager, you need to estimate software project duration. Analyze project factors and predict completion time.',
    features: [
      {
        name: 'Team Size',
        minValue: 3,
        maxValue: 15,
        format: (value) => `${value} devs`,
        weight: -0.3
      },
      {
        name: 'Complexity',
        minValue: 1,
        maxValue: 5,
        format: (value) => `Level ${value}`,
        weight: 0.35
      },
      {
        name: 'Requirements Clarity',
        minValue: 1,
        maxValue: 5,
        format: (value) => `${value}/5`,
        weight: -0.2
      },
      {
        name: 'Technical Debt',
        minValue: 1,
        maxValue: 5,
        format: (value) => `Level ${value}`,
        weight: 0.15
      }
    ],
    model: (features: number[]) => {
      const [teamSize, complexity, clarity, techDebt] = features;
      
      // Base time calculation (in days)
      const baseTime = 30;
      
      // Productivity factors
      const teamFactor = Math.sqrt(5 / teamSize); // Diminishing returns on team size
      const complexityFactor = complexity * 1.5;
      const clarityFactor = 1 + (5 - clarity) * 0.2;
      const debtFactor = 1 + (techDebt - 1) * 0.1;
  
      return Math.round(
        baseTime * teamFactor * complexityFactor * clarityFactor * debtFactor
      );
    },
    baselineScore: 45,
    theme: 'tech',
    difficulty: 'hard',
    requiredScore: 85,
    targetVariable: 'Days to Complete',
    hints: [
      'Larger teams generally reduce completion time, but with diminishing returns',
      'High complexity and technical debt increase development time',
      'Clear requirements help reduce timeline'
    ]
  },
  {
    id: 9,
    title: 'Social Media Engagement',
    description: 'Predict post engagement levels on social media',
    story: 'As a social media manager, you need to forecast how well posts will perform. Analyze the content characteristics and predict engagement levels.',
    features: [
      {
        name: 'Follower Count',
        minValue: 1000,
        maxValue: 100000,
        format: (value) => value >= 1000 ? `${(value/1000).toFixed(1)}K` : value.toString(),
        weight: 0.35
      },
      {
        name: 'Post Type',
        minValue: 1,
        maxValue: 4,
        format: (value) => ['Text', 'Image', 'Video', 'Story'][value - 1],
        weight: 0.25
      },
      {
        name: 'Time of Day',
        minValue: 0,
        maxValue: 18,
        format: (value) => `${value}:00`,
        weight: 0.2
      },
      {
        name: 'Hashtag Count',
        minValue: 0,
        maxValue: 10,
        format: (value) => value.toString(),
        weight: 0.2
      }
    ],
    model: (features: number[]) => {
      const [followers, postType, timeOfDay, hashtags] = features;
      
      // Base engagement rate decreases with follower count
      const baseEngagement = followers * (0.05 - Math.log10(followers) * 0.01);
      
      // Content type multipliers
      const contentMultiplier = [1, 1.5, 2.5, 1.8][postType - 1];
      
      // Time of day factor (peak at 12:00)
      const timeFactor = 1 - Math.abs(timeOfDay - 12) / 24;
      
      // Hashtag optimization (diminishing returns after 5)
      const hashtagFactor = 1 + Math.min(hashtags, 5) * 0.1;
  
      return Math.round(
        baseEngagement * contentMultiplier * (0.8 + timeFactor * 0.4) * hashtagFactor
      );
    },
    baselineScore: 500,
    theme: 'tech',
    difficulty: 'medium',
    requiredScore: 75,
    targetVariable: 'Engagement Score',
    hints: [
      'Higher follower count increases base engagement, but with diminishing returns',
      'Video content typically performs best',
      'Peak engagement occurs around midday',
      'Too many hashtags have diminishing returns'
    ]
  },
  {
    id: 10,
    title: 'Credit Card Approval',
    description: 'Determine credit card application approval',
    story: 'As a credit risk analyst, you need to evaluate credit card applications. Review applicant information and determine approval status.',
    features: [
      {
        name: 'Monthly Income',
        minValue: 2000,
        maxValue: 10000,
        format: (value) => `$${value.toLocaleString()}`,
        weight: 0.4
      },
      {
        name: 'Credit Score',
        minValue: 580,
        maxValue: 820,
        format: (value) => value.toString(),
        weight: 0.3
      },
      {
        name: 'Employment Length',
        minValue: 0,
        maxValue: 10,
        format: (value) => value === 0 ? 'Unemployed' : `${value} years`,
        weight: 0.2
      },
      {
        name: 'Existing Debt',
        minValue: 0,
        maxValue: 30000,
        format: (value) => `$${value.toLocaleString()}`,
        weight: -0.1
      }
    ],
    model: (features: number[]) => {
      const [income, creditScore, employment, debt] = features;
      
      // Normalize each factor
      const incomeScore = Math.min(income / 5000, 2);
      const creditScoreNorm = (creditScore - 580) / (820 - 580);
      const employmentScore = Math.min(employment / 5, 1);
      const debtRatio = debt / income;
      const debtScore = 1 - Math.min(debtRatio, 1);
  
      const finalScore = (
        incomeScore * 0.4 +
        creditScoreNorm * 0.3 +
        employmentScore * 0.2 +
        debtScore * 0.1
      );
  
      return finalScore >= 0.7 ? 1 : 0;
    },
    baselineScore: 0.7,
    theme: 'financial',
    difficulty: 'hard',
    requiredScore: 85,
    targetVariable: 'Approval Status',
    hints: [
      'Income and credit score are primary factors',
      'Employment history shows stability',
      'High debt-to-income ratio reduces approval chances',
      'Longer credit history improves odds'
    ]
  }
];

export default LEVELS;