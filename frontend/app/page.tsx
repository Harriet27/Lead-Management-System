import LeadForm from '../components/lead-form'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Contact Us</h1>
          <LeadForm />
        </div>
      </div>
    </main>
  )
}

