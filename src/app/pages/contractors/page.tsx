import { Metadata } from 'next';
import { ContractorsPageContent } from './ContractorsPageContent';

export const metadata: Metadata = {
  title: 'Wholesale Closets for Pros | Modular Closets Contractor Program',
  description:
    'Join the Modular Closets Contractor Program. Get wholesale pricing, dedicated support, free custom designs, and speedy turnaround for your clients.',
};

export default function ContractorsPage() {
  return <ContractorsPageContent />;
}
