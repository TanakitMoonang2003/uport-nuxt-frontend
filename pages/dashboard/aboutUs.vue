<template>
  <div
    class="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50"
  >
    <!-- Navigation is handled by layout -->

    <!-- Hero Section -->
    <section class="relative py-20 px-4 overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-r from-yellow-200/30 to-amber-200/30 transform -skew-y-6"
      ></div>
      <div class="max-w-7xl mx-auto relative text-center">
        <h1 class="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
          About
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600"
            >Our Story</span
          >
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          We are a passionate team of innovators, designers, and developers
          committed to transforming ideas into exceptional digital experiences.
        </p>
      </div>
    </section>

    <!-- Our Mission & Vision -->
    <section class="py-20 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12">
          <div class="space-y-6">
            <div
              class="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold"
            >
              Our Mission
            </div>
            <h2 class="text-4xl font-bold text-gray-800">
              Empowering Digital Transformation
            </h2>
            <p class="text-gray-600 text-lg leading-relaxed">
              Our mission is to empower businesses with cutting-edge digital
              solutions that drive growth, innovation, and success. We believe
              in creating technology that not only solves problems but inspires
              possibilities.
            </p>
            <p class="text-gray-600 leading-relaxed">
              Through collaboration, creativity, and technical excellence, we
              help our clients navigate the digital landscape and achieve their
              most ambitious goals.
            </p>
          </div>
          <div class="space-y-6">
            <div
              class="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold"
            >
              Our Vision
            </div>
            <h2 class="text-4xl font-bold text-gray-800">
              Leading the Future of Innovation
            </h2>
            <p class="text-gray-600 text-lg leading-relaxed">
              We envision a world where technology seamlessly integrates with
              human creativity to create meaningful impact. Our goal is to be at
              the forefront of digital innovation, setting new standards for
              excellence.
            </p>
            <p class="text-gray-600 leading-relaxed">
              We strive to build lasting partnerships with our clients, becoming
              their trusted advisor in their journey toward digital excellence
              and sustainable growth.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Values -->
    <section class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            These principles guide everything we do and shape our company
            culture.
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(value, index) in values"
            :key="index"
            class="group p-8 rounded-2xl bg-white hover:shadow-2xl transition transform hover:-translate-y-2 border-2 border-yellow-100"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition"
            >
              <component :is="value.icon" class="w-8 h-8" />
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-3">
              {{ value.title }}
            </h3>
            <p class="text-gray-600 leading-relaxed">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-20 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Talented individuals working together to create extraordinary
            results.
          </p>
        </div>
        <div class="flex flex-wrap justify-center gap-8">
          <div
            v-for="(member, index) in teamMembers"
            :key="index"
            class="group text-center w-64"
          >
            <div class="relative mb-6 overflow-hidden rounded-2xl">
              <img
                :src="member.image"
                :alt="member.name"
                class="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-yellow-900/80 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end justify-center p-6"
              >
                <div class="flex space-x-4">
                  <a
                    href="#"
                    class="w-10 h-10 bg-white rounded-full flex items-center justify-center text-yellow-600 hover:bg-yellow-50 transition"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    class="w-10 h-10 bg-white rounded-full flex items-center justify-center text-yellow-600 hover:bg-yellow-50 transition"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-1">
              {{ member.name }}
            </h3>
            <p class="text-yellow-600 font-semibold mb-2">{{ member.role }}</p>
            <p class="text-gray-600 text-sm">{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 px-4 bg-gradient-to-br from-yellow-400 to-amber-500">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-4 gap-8 text-center text-white">
          <div v-for="(stat, index) in stats" :key="index" class="space-y-2">
            <div class="text-5xl font-bold">{{ stat.value }}</div>
            <div class="text-xl font-semibold opacity-90">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Company Timeline -->
    <section class="py-20 px-4 bg-white">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">Our Journey</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            From humble beginnings to industry leaders - here's our story.
          </p>
        </div>
        <div class="space-y-12">
          <div
            v-for="(milestone, index) in timeline"
            :key="index"
            class="flex gap-8 items-start"
          >
            <div class="flex-shrink-0 w-32 text-right">
              <div
                class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600"
              >
                {{ milestone.year }}
              </div>
            </div>
            <div class="flex-shrink-0 relative">
              <div
                class="w-4 h-4 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full"
              ></div>
              <div
                v-if="index < timeline.length - 1"
                class="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-20 bg-gradient-to-b from-yellow-400 to-amber-500"
              ></div>
            </div>
            <div class="flex-1 pb-12">
              <h3 class="text-2xl font-bold text-gray-800 mb-2">
                {{ milestone.title }}
              </h3>
              <p class="text-gray-600 leading-relaxed">
                {{ milestone.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl font-bold text-gray-800 mb-6">
          Ready to Work With Us?
        </h2>
        <p class="text-xl text-gray-600 mb-8">
          Let's collaborate and create something amazing together.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <button
            class="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-8 py-4 rounded-full hover:shadow-xl transition transform hover:scale-105 text-lg font-semibold"
          >
            Start a Project
          </button>
          <button
            class="border-2 border-yellow-400 text-gray-700 px-8 py-4 rounded-full hover:bg-yellow-50 transition text-lg font-semibold"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>

    <!-- Footer is handled by layout -->
  </div>
</template>

<script setup>
// Set layout to dashboard to ensure navbar is shown
definePageMeta({
  layout: 'dashboard'
})

const values = [
  {
    icon: "IconInnovation",
    title: "Innovation",
    description:
      "We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions that keep our clients ahead of the curve.",
  },
  {
    icon: "IconQuality",
    title: "Excellence",
    description:
      "Quality is at the heart of everything we do. We are committed to delivering exceptional results that exceed expectations.",
  },
  {
    icon: "IconCollaboration",
    title: "Collaboration",
    description:
      "We believe in the power of teamwork, both within our organization and with our clients, to achieve remarkable outcomes.",
  },
  {
    icon: "IconIntegrity",
    title: "Integrity",
    description:
      "We operate with transparency, honesty, and ethical practices in all our business relationships and commitments.",
  },
  {
    icon: "IconPassion",
    title: "Passion",
    description:
      "We love what we do and it shows in our work. Our enthusiasm drives us to create exceptional digital experiences.",
  },
  {
    icon: "IconGrowth",
    title: "Growth",
    description:
      "We are committed to continuous learning and development, ensuring we stay at the forefront of industry trends.",
  },
];

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    bio: "Visionary leader with 15+ years in tech",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
  },
];

const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "200+", label: "Happy Clients" },
  { value: "50+", label: "Team Members" },
  { value: "15+", label: "Years Experience" },
];

const timeline = [
  {
    year: "2025",
    title: "Global Expansion",
    description:
      "Opened new offices in three continents and reached 500+ successful projects milestone.",
  },
  {
    year: "2022",
    title: "Innovation Lab Launch",
    description:
      "Established our R&D department to explore emerging technologies like AI and blockchain.",
  },
  {
    year: "2018",
    title: "Major Milestone",
    description:
      "Reached 100 employees and won 'Best Digital Agency' award for innovative solutions.",
  },
  {
    year: "2015",
    title: "First Office",
    description:
      "Moved to our first official office space and expanded our team to 25 members.",
  },
  {
    year: "2010",
    title: "The Beginning",
    description:
      "Founded with a vision to transform digital experiences. Started with just 3 passionate founders.",
  },
];

// Icon components
const IconInnovation = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  `,
};

const IconQuality = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  `,
};

const IconCollaboration = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  `,
};

const IconIntegrity = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  `,
};

const IconPassion = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  `,
};

const IconGrowth = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  `,
};
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
