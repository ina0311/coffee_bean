import React from 'react'
import { Link } from 'react-router-dom'


export const Home = () => {

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed w-full bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-brown-600">
            Coffee Bean
          </Link>
          <div className="space-x-4">
            <Link
              to="/signin"
              className="px-4 py-2 text-brown-600 hover:text-brown-800"
            >
              サインイン
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-brown-600 text-white rounded-md hover:bg-brown-700"
            >
              新規登録
            </Link>
          </div>
        </nav>
      </header>

      <main className="pt-20">
        <section className="bg-brown-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-brown-800 mb-6">
              最高級のコーヒー体験を
            </h1>
            <p className="text-xl text-brown-600 mb-8">
              厳選された豆から抽出される至福の一杯をお届けします
            </p>
          </div>
        </section>
      </main>
    </div>
  )
} 