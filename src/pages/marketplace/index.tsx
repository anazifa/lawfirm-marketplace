import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { SearchBar } from '@/components/marketplace/SearchBar';
import { CategoryFilter } from '@/components/marketplace/CategoryFilter';
import { LawyerGrid } from '@/components/marketplace/LawyerGrid';
import { FeaturedLawyers } from '@/components/marketplace/FeaturedLawyers';
import { Layout } from '@/components/layout/Layout';
import { Lawyer, SearchFilters } from '@/types/marketplace';
import { prisma } from '@/lib/prisma';

interface MarketplaceProps {
  initialLawyers: Lawyer[];
  practiceAreas: string[];
  locations: string[];
}

export default function MarketplacePage() {
  const { data: session } = useSession();
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000],
    rating: 0,
    location: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchTerm: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/lawyers/search?q=${searchTerm}`);
      const data = await response.json();
      setLawyers(data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = async (newFilters: SearchFilters) => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams();
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, JSON.stringify(value));
        }
      });
      
      const response = await fetch(`/api/lawyers/filter?${queryParams}`);
      const data = await response.json();
      setLawyers(data);
      setFilters(newFilters);
    } catch (error) {
      console.error('Filter failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Find the Perfect Legal Expert
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Connect with verified lawyers specializing in your needs
            </p>
            <SearchBar onSearch={handleSearch} />
          </div>
        </section>

        {/* Featured Lawyers */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Featured Lawyers</h2>
            <FeaturedLawyers />
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <CategoryFilter
                selectedCategory={filters.category}
                onCategoryChange={(category) =>
                  setFilters({ ...filters, category })
                }
              />
              <PriceFilter
                range={filters.priceRange}
                onRangeChange={(range) =>
                  setFilters({ ...filters, priceRange: range })
                }
              />
              <RatingFilter
                rating={filters.rating}
                onRatingChange={(rating) =>
                  setFilters({ ...filters, rating })
                }
              />
              <LocationFilter
                location={filters.location}
                onLocationChange={(location) =>
                  setFilters({ ...filters, location })
                }
              />
            </div>

            {/* Lawyers Grid */}
            <div className="lg:col-span-3">
              <LawyerGrid
                lawyers={lawyers}
                isLoading={isLoading}
                userRole={session?.user?.role}
                filters={filters}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const lawyers = await prisma.user.findMany({
    where: {
      role: 'LAWYER',
      isVerified: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      profileImage: true,
      practiceAreas: true,
      hourlyRate: true,
      experience: true,
      location: true,
      bio: true,
      isVerified: true,
    },
  });

  const practiceAreas = [...new Set(lawyers.flatMap(lawyer => lawyer.practiceAreas))];
  const locations = [...new Set(lawyers.map(lawyer => lawyer.location).filter(Boolean))];

  return {
    props: {
      initialLawyers: JSON.parse(JSON.stringify(lawyers)),
      practiceAreas,
      locations,
    },
  };
}; 