import { Bond } from '../types/Bond';

// Mock data for development
const mockBonds: Bond[] = [
  {
    id: '1',
    name: 'GovernmentBond1',
    price: 98.5,
    yield: 3.45,
    duration: 9.5,
    rating: 'AAA',
    maturity: '2033-03-15',
    weeklyYieldChange: -0.05,
    historicalYields: Array.from({ length: 90 }, (_, i) => ({
      date: new Date(Date.now() - (89 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      yield: 3.45 + Math.sin(i / 10) * 0.2
    }))
  },
  {
    id: '2',
    name: 'CorporateBond1',
    price: 97.2,
    yield: 4.75,
    duration: 7.2,
    rating: 'AA',
    maturity: '2030-06-20',
    weeklyYieldChange: 0.08,
    historicalYields: Array.from({ length: 90 }, (_, i) => ({
      date: new Date(Date.now() - (89 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      yield: 4.75 + Math.cos(i / 8) * 0.3
    }))
  },
  {
    id: '3',
    name: 'MunicipalBond1',
    price: 99.1,
    yield: 2.85,
    duration: 5.5,
    rating: 'AA+',
    maturity: '2028-09-30',
    weeklyYieldChange: -0.03,
    historicalYields: Array.from({ length: 90 }, (_, i) => ({
      date: new Date(Date.now() - (89 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      yield: 2.85 + Math.sin(i / 12) * 0.15
    }))
  },
  {
    id: '4',
    name: 'CorporateBond2',
    price: 94.5,
    yield: 6.8,
    duration: 4.8,
    rating: 'BB',
    maturity: '2027-12-15',
    weeklyYieldChange: 0.12,
    historicalYields: Array.from({ length: 90 }, (_, i) => ({
      date: new Date(Date.now() - (89 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      yield: 6.8 + Math.cos(i / 6) * 0.4
    }))
  },
  {
    id: '5',
    name: 'GovernmentBond2',
    price: 98.8,
    yield: 3.15,
    duration: 8.2,
    rating: 'AAA',
    maturity: '2031-03-31',
    weeklyYieldChange: -0.02,
    historicalYields: Array.from({ length: 90 }, (_, i) => ({
      date: new Date(Date.now() - (89 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      yield: 3.15 + Math.sin(i / 15) * 0.25
    }))
  }
];

export class BondDataService {
  private subscribers: ((bonds: Bond[]) => void)[] = [];

  connect() {
    // Immediately send mock data
    setTimeout(() => {
      this.notifySubscribers(mockBonds);
    }, 1000);

    // Simulate real-time updates every 5 seconds
    setInterval(() => {
      const updatedBonds = mockBonds.map(bond => ({
        ...bond,
        yield: bond.yield + (Math.random() - 0.5) * 0.1,
        price: bond.price + (Math.random() - 0.5) * 0.3,
        weeklyYieldChange: bond.weeklyYieldChange + (Math.random() - 0.5) * 0.02,
        historicalYields: [
          ...bond.historicalYields!.slice(1),
          {
            date: new Date().toISOString().split('T')[0],
            yield: bond.yield + (Math.random() - 0.5) * 0.1
          }
        ]
      }));
      this.notifySubscribers(updatedBonds);
    }, 5000);
  }

  subscribe(callback: (bonds: Bond[]) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  private notifySubscribers(bondData: Bond[]) {
    this.subscribers.forEach(callback => callback(bondData));
  }

  disconnect() {
    // Nothing to disconnect in mock implementation
  }
} 