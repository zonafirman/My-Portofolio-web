'use client'
import React, { useState } from 'react'
import { Code2, Palette, Megaphone, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import ScrollFloat from './ScrollFloat'

interface Item {
  title: string
  icon: React.ReactElement
  content: string
  imageUrl: string
}

const items: Item[] = [
  {
    title: 'Development',
    icon: <Code2 className="w-5 h-5" />,
    content:
      'Building responsive websites. Providing the users an enriching experience that responds to any device and screen size.',
    imageUrl:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=870&auto=format&fit=crop',
  },
  {
    title: 'UI/UX Design',
    icon: <Palette className="w-5 h-5" />,
    content:
      'Designing intuitive and beautiful user interfaces that provide seamless and enjoyable user experiences.',
    imageUrl:
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=870&auto=format&fit=crop',
  },
  {
    title: 'Branding',
    icon: <Megaphone className="w-5 h-5" />,
    content:
      'Creating strong visual identities that reflect the essence of your brand and connect with your audience.',
    imageUrl:
      'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=871&auto=format&fit=crop',
  },
]

export default function ExpertiseAccordion() {
  const [active, setActive] = useState<number | null>(0)

  const toggle = (index: number) => {
    setActive(active === index ? null : index)
  }

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative w-full h-80 md:h-full rounded-2xl overflow-hidden shadow-lg">
            {items.map((item, index) => (
              <Image
                key={index}
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-cover transition-opacity duration-500 ease-in-out ${
                  active === index ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
          <div>
            <p className="text-purple-600 dark:text-purple-400 font-medium uppercase tracking-widest mb-2">
              Speciality
            </p>
            <ScrollFloat
              containerClassName="mb-8"
              textClassName="text-4xl font-bold text-gray-900 dark:text-white"
            >
              Areas of Expertise
            </ScrollFloat>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`border border-gray-200 dark:border-gray-700 rounded-2xl bg-white transition-all duration-300 overflow-hidden ${
                    active === index
                      ? 'shadow-lg dark:shadow-purple-900/20'
                      : 'shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => toggle(index)}
                    className="flex items-center justify-between w-full p-5 text-left"
                    aria-expanded={active === index}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-purple-600 dark:text-purple-400">
                        {item.icon}
                      </span>
                      <span className="font-semibold text-gray-800 text-lg">
                        {item.title}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ease-out ${
                        active === index ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      active === index
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden px-5 pb-5">
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
