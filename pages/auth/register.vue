<template>
  <div
    class="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 flex items-center justify-center p-6"
  >
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <!-- Logo -->
      <div class="flex items-center justify-center mb-6">
        <div class="flex items-center gap-2">
          <div class="flex gap-1">
            <div
              class="w-2.5 h-7 bg-gradient-to-b from-amber-400 to-yellow-500 rounded-sm"
            ></div>
            <div
              class="w-2.5 h-7 bg-gradient-to-b from-yellow-400 to-amber-500 rounded-sm"
            ></div>
            <div
              class="w-2.5 h-7 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-sm"
            ></div>
          </div>
          <span class="text-2xl font-bold text-gray-900">UPORT</span>
        </div>
      </div>

      <!-- Description -->
      <p class="text-center text-sm text-gray-600 mb-6">
        Let's get everything set up so you can verify your personal<br />
        account and start setting up your profile.
      </p>
      
      <!-- Email Domain Warning (Only for Student and Teacher) -->
      <div v-if="showDomainWarning && activeTab !== 'company'" class="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
        <div class="flex items-start">
          <svg class="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div class="text-sm text-red-800">
            <p class="font-semibold mb-1">Registration Restricted</p>
            <p>Only cmtc email addresses are allowed for {{ activeTab }} registration. Please use your @cmtc.ac.th email address.</p>
          </div>
        </div>
      </div>

      <!-- Company Info Message -->
      <div v-if="activeTab === 'company'" class="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
        <div class="flex items-start">
          <svg class="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div class="text-sm text-blue-800">
            <p class="font-semibold mb-1">Company Registration</p>
            <p>You can use any email address for company registration. No email verification required.</p>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-2 mb-6">
        <button
          @click="activeTab = 'student'"
          :class="[
            'flex-1 py-2.5 text-sm font-medium rounded-lg transition',
            activeTab === 'student'
              ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          ]"
        >
          Student
        </button>
        <button
          @click="activeTab = 'teacher'"
          :class="[
            'flex-1 py-2.5 text-sm font-medium rounded-lg transition',
            activeTab === 'teacher'
              ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          ]"
        >
          Teacher
        </button>
        <button
          @click="activeTab = 'company'"
          :class="[
            'flex-1 py-2.5 text-sm font-medium rounded-lg transition',
            activeTab === 'company'
              ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          ]"
        >
          Company
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
        {{ errorMessage }}
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
        {{ successMessage }}
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Student Form -->
        <template v-if="activeTab === 'student'">
          <!-- Email -->
          <div>
            <label class="block text-xs text-gray-700 mb-1.5"
              >Email (MUT)</label
            >
            <input
              v-model="studentData.email"
              type="email"
              placeholder="balomta@cmtc.ac.th"
              class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition placeholder-gray-500"
            />
          </div>

          <!-- Username and Student ID -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-700 mb-1.5"
                >User Name</label
              >
              <input
                v-model="studentData.username"
                type="text"
                placeholder="balomta"
                class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-700 mb-1.5"
                >Student ID</label
              >
              <input
                v-model="studentData.studentId"
                type="text"
                placeholder="65xxxxxx"
                class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
          </div>

          <!-- Password and Confirm Password -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-700 mb-1.5">Password</label>
              <div class="relative">
                <input
                  v-model="studentData.password"
                  :type="showPassword ? 'text' : 'password'"
                  :class="[
                    'w-full px-3 py-2.5 text-sm bg-white text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition pr-9 placeholder-gray-500',
                    studentData.password && studentData.password.length < 6 ? 'border-red-300' : 'border-gray-300'
                  ]"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      v-if="!showPassword"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      v-if="!showPassword"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                    <path
                      v-if="showPassword"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <label class="block text-xs text-gray-700 mb-1.5"
                >Confirm Password</label
              >
              <div class="relative">
                <input
                  v-model="studentData.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  :class="[
                    'w-full px-3 py-2.5 text-sm bg-white text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition pr-9 placeholder-gray-500',
                    studentData.confirmPassword && studentData.password !== studentData.confirmPassword ? 'border-red-300' : 
                    studentData.confirmPassword && studentData.password === studentData.confirmPassword ? 'border-green-300' : 'border-gray-300'
                  ]"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      v-if="!showConfirmPassword"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      v-if="!showConfirmPassword"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                    <path
                      v-if="showConfirmPassword"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                </button>
              </div>
              <!-- Password match indicator -->
              <div v-if="studentData.confirmPassword" class="mt-1 text-xs">
                <span v-if="studentData.password === studentData.confirmPassword" class="text-green-600">
                  ✓ Passwords match
                </span>
                <span v-else class="text-red-600">
                  ✗ Passwords do not match
                </span>
              </div>
            </div>
          </div>

          <!-- First Name and Last Name -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-700 mb-1.5"
                >First Name</label
              >
              <input
                v-model="studentData.firstName"
                type="text"
                placeholder="ชื่อ"
                class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-700 mb-1.5"
                >Last Name</label
              >
              <input
                v-model="studentData.lastName"
                type="text"
                placeholder="นามสกุล"
                class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
          </div>

          <!-- Phone Number and Year of Study -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-700 mb-1.5"
                >Phone Number</label
              >
              <input
                v-model="studentData.phone"
                type="tel"
                placeholder="08-1234567890"
                class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-700 mb-1.5"
                >Year Of Study</label
              >
              <input
                v-model="studentData.yearOfStudy"
                type="text"
                placeholder="4แผนก"
                class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
          </div>
        </template>

        <!-- Teacher Form -->
        <template v-else-if="activeTab === 'teacher'">
          <!-- Email -->
          <div>
            <label class="block text-xs text-gray-700 mb-1.5"
              >Email (MUT)</label
            >
            <input
              v-model="teacherData.email"
              type="email"
              placeholder="teacher@cmtc.ac.th"
              class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition placeholder-gray-500"
            />
          </div>

          <!-- Username and Teacher ID -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-700 mb-1.5"
                >User Name</label
              >
              <input
                v-model="teacherData.username"
                type="text"
                placeholder="teacher_username"
                class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-700 mb-1.5"
                >Teacher ID</label
              >
              <input
                v-model="teacherData.teacherId"
                type="text"
                placeholder="T12345"
                class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
          </div>

          <!-- Password and Confirm Password -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-700 mb-1.5">Password</label>
              <div class="relative">
                <input
                  v-model="teacherData.password"
                  :type="showPassword ? 'text' : 'password'"
                  :class="[
                    'w-full px-3 py-2.5 text-sm bg-white text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition pr-9 placeholder-gray-500',
                    teacherData.password && teacherData.password.length < 6 ? 'border-red-300' : 'border-gray-300'
                  ]"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      v-if="!showPassword"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      v-if="!showPassword"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                    <path
                      v-if="showPassword"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <label class="block text-xs text-gray-700 mb-1.5"
                >Confirm Password</label
              >
              <div class="relative">
                <input
                  v-model="teacherData.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  :class="[
                    'w-full px-3 py-2.5 text-sm bg-white text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition pr-9 placeholder-gray-500',
                    teacherData.confirmPassword && teacherData.password !== teacherData.confirmPassword ? 'border-red-300' : 
                    teacherData.confirmPassword && teacherData.password === teacherData.confirmPassword ? 'border-green-300' : 'border-gray-300'
                  ]"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      v-if="!showConfirmPassword"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      v-if="!showConfirmPassword"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                    <path
                      v-if="showConfirmPassword"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                </button>
              </div>
              <!-- Password match indicator -->
              <div v-if="teacherData.confirmPassword" class="mt-1 text-xs">
                <span v-if="teacherData.password === teacherData.confirmPassword" class="text-green-600">
                  ✓ Passwords match
                </span>
                <span v-else class="text-red-600">
                  ✗ Passwords do not match
                </span>
              </div>
            </div>
          </div>

          <!-- Title and First Name -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-700 mb-1.5">Title</label>
              <select
                v-model="teacherData.title"
                class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              >
                <option value="">เลือก</option>
                <option value="นาย">นาย</option>
                <option value="นาง">นาง</option>
                <option value="นางสาว">นางสาว</option>
                <option value="ดร.">ดร.</option>
                <option value="ผศ.">ผศ.</option>
                <option value="รศ.">รศ.</option>
                <option value="ศ.">ศ.</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-700 mb-1.5"
                >First Name</label
              >
              <input
                v-model="teacherData.firstName"
                type="text"
                placeholder="ชื่อ"
                class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
          </div>

          <!-- Last Name -->
          <div>
            <label class="block text-xs text-gray-700 mb-1.5">Last Name</label>
            <input
              v-model="teacherData.lastName"
              type="text"
              placeholder="นามสกุล"
              class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition placeholder-gray-500"
            />
          </div>

          <!-- Faculty and Department -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-700 mb-1.5">Faculty</label>
              <select
                v-model="teacherData.faculty"
                class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              >
                <option value="">เลือกคณะ</option>
                <option value="engineering">วิศวกรรมศาสตร์</option>
                <option value="science">วิทยาศาสตร์</option>
                <option value="business">บริหารธุรกิจ</option>
                <option value="agriculture">เกษตรศาสตร์</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-700 mb-1.5"
                >Department</label
              >
              <input
                v-model="teacherData.department"
                type="text"
                placeholder="สาขาวิชา"
                class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
          </div>

          <!-- Position and Office Room -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-700 mb-1.5">Position</label>
              <select
                v-model="teacherData.position"
                class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              >
                <option value="">เลือกตำแหน่ง</option>
                <option value="lecturer">อาจารย์</option>
                <option value="assistant_prof">ผู้ช่วยศาสตราจารย์</option>
                <option value="associate_prof">รองศาสตราจารย์</option>
                <option value="professor">ศาสตราจารย์</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-700 mb-1.5"
                >Office Room</label
              >
              <input
                v-model="teacherData.officeRoom"
                type="text"
                placeholder="ห้อง 301"
                class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
          </div>

          <!-- Phone Number and Office Phone -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-700 mb-1.5"
                >Phone Number</label
              >
              <input
                v-model="teacherData.phone"
                type="tel"
                placeholder="08-1234567890"
                class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-700 mb-1.5"
                >Office Phone</label
              >
              <input
                v-model="teacherData.officePhone"
                type="tel"
                placeholder="055-123456"
                class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
          </div>

          <!-- Specialization -->
          <div>
            <label class="block text-xs text-gray-700 mb-1.5"
              >Specialization</label
            >
            <textarea
              v-model="teacherData.specialization"
              placeholder="ความเชี่ยวชาญ / สาขาที่สนใจ"
              rows="2"
              class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition resize-none placeholder-gray-500"
            ></textarea>
          </div>
        </template>

        <!-- Company Form -->
        <template v-if="activeTab === 'company'">
          <!-- Email -->
          <div>
            <label class="block text-xs text-gray-700 mb-1.5"
              >Email</label
            >
            <input
              v-model="companyData.email"
              type="email"
              placeholder="company@example.com"
              class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition placeholder-gray-500"
            />
          </div>

          <!-- Company Name and Username -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-700 mb-1.5"
                >Company Name</label
              >
              <input
                v-model="companyData.companyName"
                type="text"
                placeholder="บริษัท ตัวอย่าง จำกัด"
                class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-700 mb-1.5"
                >Username</label
              >
              <input
                v-model="companyData.username"
                type="text"
                placeholder="company_username"
                class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
          </div>

          <!-- Password and Confirm Password -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-700 mb-1.5">Password</label>
              <div class="relative">
                <input
                  v-model="companyData.password"
                  :type="showPassword ? 'text' : 'password'"
                  :class="[
                    'w-full px-3 py-2.5 text-sm bg-white text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition pr-9 placeholder-gray-500',
                    companyData.password && companyData.password.length < 6 ? 'border-red-300' : 'border-gray-300'
                  ]"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      v-if="!showPassword"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      v-if="!showPassword"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                    <path
                      v-if="showPassword"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <label class="block text-xs text-gray-700 mb-1.5"
                >Confirm Password</label
              >
              <div class="relative">
                <input
                  v-model="companyData.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  :class="[
                    'w-full px-3 py-2.5 text-sm bg-white text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition pr-9 placeholder-gray-500',
                    companyData.confirmPassword && companyData.password !== companyData.confirmPassword ? 'border-red-300' : 
                    companyData.confirmPassword && companyData.password === companyData.confirmPassword ? 'border-green-300' : 'border-gray-300'
                  ]"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      v-if="!showConfirmPassword"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      v-if="!showConfirmPassword"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                    <path
                      v-if="showConfirmPassword"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                </button>
              </div>
              <!-- Password match indicator -->
              <div v-if="companyData.confirmPassword" class="mt-1 text-xs">
                <span v-if="companyData.password === companyData.confirmPassword" class="text-green-600">
                  ✓ Passwords match
                </span>
                <span v-else class="text-red-600">
                  ✗ Passwords do not match
                </span>
              </div>
            </div>
          </div>

          <!-- Contact Person Name -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-700 mb-1.5"
                >Contact Person First Name</label
              >
              <input
                v-model="companyData.contactFirstName"
                type="text"
                placeholder="ชื่อผู้ติดต่อ"
                class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-700 mb-1.5"
                >Contact Person Last Name</label
              >
              <input
                v-model="companyData.contactLastName"
                type="text"
                placeholder="นามสกุลผู้ติดต่อ"
                class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
          </div>

          <!-- Phone and Industry -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-gray-700 mb-1.5"
                >Phone Number</label
              >
              <input
                v-model="companyData.phone"
                type="tel"
                placeholder="02-123-4567"
                class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>
            <div>
              <label class="block text-xs text-gray-700 mb-1.5"
                >Industry</label
              >
              <select
                v-model="companyData.industry"
                class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              >
                <option value="">เลือกอุตสาหกรรม</option>
                <option value="technology">เทคโนโลยี</option>
                <option value="finance">การเงิน</option>
                <option value="manufacturing">การผลิต</option>
                <option value="education">การศึกษา</option>
                <option value="healthcare">สุขภาพ</option>
                <option value="retail">ค้าปลีก</option>
                <option value="other">อื่นๆ</option>
              </select>
            </div>
          </div>

          <!-- Address -->
          <div>
            <label class="block text-xs text-gray-700 mb-1.5"
              >Company Address</label
            >
            <textarea
              v-model="companyData.address"
              placeholder="ที่อยู่บริษัท"
              rows="2"
              class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition resize-none placeholder-gray-500"
            ></textarea>
          </div>

          <!-- Company Description -->
          <div>
            <label class="block text-xs text-gray-700 mb-1.5"
              >Company Description</label
            >
            <textarea
              v-model="companyData.description"
              placeholder="รายละเอียดบริษัท / กิจกรรมหลัก"
              rows="2"
              class="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition resize-none placeholder-gray-500"
            ></textarea>
          </div>
        </template>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none mt-6"
        >
          <span v-if="isLoading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating Account...
          </span>
          <span v-else>Create Account</span>
        </button>

        <!-- Login Link -->
        <div class="text-center text-sm text-gray-600 pt-2">
          Already Have An Account ?
          <NuxtLink
            to="/auth/login"
            class="text-amber-600 hover:text-amber-700 font-medium transition"
          >
            Log In
          </NuxtLink>
        </div>
      </form>
    </div>
    
    <!-- OTP Verification Modal -->
    <OTPVerification 
      :is-open="showOTPModal" 
      :email="pendingEmail"
      @close="showOTPModal = false"
      @verified="handleOTPVerified"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useAuth } from "~/composables/useAuth";

const config = useRuntimeConfig()
const apiBase = config.public.apiBase.replace(/\/api$/, '')

// Use auth layout (no navbar)
definePageMeta({
  layout: 'auth'
});

const activeTab = ref("student");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const showDomainWarning = ref(false);
const showOTPModal = ref(false);
const pendingEmail = ref('');

const studentData = ref({
  email: "balomta@cmtc.ac.th",
  username: "",
  studentId: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  phone: "",
  yearOfStudy: "",
});

const teacherData = ref({
  email: "",
  username: "",
  teacherId: "",
  password: "",
  confirmPassword: "",
  title: "",
  firstName: "",
  lastName: "",
  faculty: "",
  department: "",
  position: "",
  officeRoom: "",
  phone: "",
  officePhone: "",
  specialization: "",
});

const companyData = ref({
  email: "",
  username: "",
  companyName: "",
  password: "",
  confirmPassword: "",
  contactFirstName: "",
  contactLastName: "",
  phone: "",
  industry: "",
  address: "",
  description: "",
});

const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

// Computed property to check if passwords match
const passwordsMatch = computed(() => {
  const data = activeTab.value === "student" ? studentData.value : 
               activeTab.value === "teacher" ? teacherData.value : companyData.value;
  return data.password && data.confirmPassword && data.password === data.confirmPassword;
});

// Computed property to check password strength
const passwordStrength = computed(() => {
  const data = activeTab.value === "student" ? studentData.value : 
               activeTab.value === "teacher" ? teacherData.value : companyData.value;
  if (!data.password) return 0;
  if (data.password.length < 6) return 1;
  if (data.password.length >= 6 && data.password.length < 8) return 2;
  return 3;
});

// Email domain validation
const validateEmailDomain = (email) => {
  if (!email || !email.includes('@')) return false;
  const allowedDomains = ['cmtc.ac.th'];
  const domain = email.split('@')[1];
  return allowedDomains.includes(domain);
};

// Watch for email changes to show domain warning
const currentEmail = computed(() => {
  if (activeTab.value === 'student') return studentData.value.email;
  if (activeTab.value === 'teacher') return teacherData.value.email;
  return companyData.value.email;
});

// Watch for email and tab changes to show/hide domain warning
watch([currentEmail, activeTab], ([newEmail, newTab]) => {
  // Only show domain warning for student and teacher, not company
  if (newTab !== 'company' && newEmail && !validateEmailDomain(newEmail)) {
    showDomainWarning.value = true;
  } else {
    showDomainWarning.value = false;
  }
});

const handleSubmit = async () => {
  isLoading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    const data = activeTab.value === "student" ? studentData.value : 
                 activeTab.value === "teacher" ? teacherData.value : companyData.value;
    
    // Validate email domain for student and teacher only
    if (activeTab.value !== "company" && !validateEmailDomain(data.email)) {
      errorMessage.value = "Only cmtc email addresses (@cmtc.ac.th) are allowed for registration.";
      return;
    }
    
    // Debug logging
    console.log("Form data:", data);
    console.log("Password:", data.password);
    console.log("Confirm Password:", data.confirmPassword);
    console.log("Username:", data.username);
    console.log("UserType (activeTab):", activeTab.value);
    console.log("All studentData:", studentData.value);
    
    // Basic validation
    if (!data.email || !data.username || !data.password) {
      throw new Error("Please fill in all required fields");
    }
    
    if (data.password !== data.confirmPassword) {
      throw new Error("Passwords do not match");
    }
    
    if (data.password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    // Prepare registration data - only include non-empty fields
    const registrationData = {
      email: data.email,
      username: data.username,
      password: data.password,
      confirmPassword: data.confirmPassword,
      userType: activeTab.value,
      // For companies, set otpVerified to true since they don't need OTP verification
      ...(activeTab.value === 'company' && { otpVerified: true })
    };

    console.log("Prepared registration data:", registrationData);

    // Add fields based on user type
    if (activeTab.value === "student") {
      if (data.studentId && data.studentId.trim()) registrationData.studentId = data.studentId;
      if (data.firstName && data.firstName.trim()) registrationData.firstName = data.firstName;
      if (data.lastName && data.lastName.trim()) registrationData.lastName = data.lastName;
      if (data.phone && data.phone.trim()) registrationData.phone = data.phone;
      if (data.yearOfStudy && data.yearOfStudy.trim()) registrationData.yearOfStudy = data.yearOfStudy;
    } else if (activeTab.value === "teacher") {
      if (data.teacherId && data.teacherId.trim()) registrationData.teacherId = data.teacherId;
      if (data.firstName && data.firstName.trim()) registrationData.firstName = data.firstName;
      if (data.lastName && data.lastName.trim()) registrationData.lastName = data.lastName;
      if (data.title && data.title.trim()) registrationData.title = data.title;
      if (data.faculty && data.faculty.trim()) registrationData.faculty = data.faculty;
      if (data.department && data.department.trim()) registrationData.department = data.department;
      if (data.position && data.position.trim()) registrationData.position = data.position;
      if (data.officeRoom && data.officeRoom.trim()) registrationData.officeRoom = data.officeRoom;
      if (data.phone && data.phone.trim()) registrationData.phone = data.phone;
      if (data.officePhone && data.officePhone.trim()) registrationData.officePhone = data.officePhone;
      if (data.specialization && data.specialization.trim()) registrationData.specialization = data.specialization;
    } else if (activeTab.value === "company") {
      if (data.companyName && data.companyName.trim()) registrationData.companyName = data.companyName;
      if (data.contactFirstName && data.contactFirstName.trim()) registrationData.contactFirstName = data.contactFirstName;
      if (data.contactLastName && data.contactLastName.trim()) registrationData.contactLastName = data.contactLastName;
      if (data.phone && data.phone.trim()) registrationData.phone = data.phone;
      if (data.industry && data.industry.trim()) registrationData.industry = data.industry;
      if (data.address && data.address.trim()) registrationData.address = data.address;
      if (data.description && data.description.trim()) registrationData.description = data.description;
    }

    // Remove confirmPassword from the data
    delete registrationData.confirmPassword;

    // Skip OTP verification for companies
    if (activeTab.value === 'company') {
      // Direct registration for companies
      const { $api } = useNuxtApp();
      const response = await $api.post('/auth/register', registrationData);

      console.log("Company registration response:", response);
      console.log("Company registration response.data:", response.data);

      if (response.data.success) {
        successMessage.value = "Registration successful! You can now log in.";
        
        // Clear form
        Object.keys(companyData.value).forEach(key => {
          companyData.value[key] = "";
        });
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigateTo('/auth/login');
        }, 2000);
      } else {
        errorMessage.value = response.data.error || "Registration failed";
      }
    } else {
      // Send OTP first for email verification for students and teachers
      console.log("Sending OTP to:", data.email);
      console.log("Using API base URL:", apiBase + "/api");
      
      const { $api } = useNuxtApp();
      console.log("API instance:", $api);
      
      try {
        console.log("About to make OTP request...");
        console.log(`Request URL will be: ${apiBase}/api/auth/send-otp`);
        console.log("Request data:", { email: data.email });
        
        // Try using fetch directly instead of axios
        console.log("Using fetch instead of axios...");
        const response = await fetch(`${apiBase}/api/auth/send-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ email: data.email })
        });
        
        console.log("Fetch response status:", response.status);
        console.log("Fetch response ok:", response.ok);
        
        const otpResponse = await response.json();
        console.log("OTP Response received:", otpResponse);

        if (otpResponse.success) {
          // Show OTP modal for email verification
          pendingEmail.value = data.email;
          showOTPModal.value = true;
        } else {
          throw new Error(otpResponse.error || "Failed to send verification code");
        }
      } catch (otpError) {
        console.error("OTP Request Error:", otpError);
        console.error("OTP Error Details:", otpError.response?.data);
        console.error("OTP Error Status:", otpError.response?.status);
        throw otpError;
      }
    }
  } catch (error) {
    console.error("Registration error:", error);
    console.error("Error details:", error.data);
    console.error("Error response:", error.response);
    
    // Try to extract error message from response
    let errorMsg = "Registration failed. Please try again.";
    
    if (error.data && error.data.error) {
      errorMsg = error.data.error;
    } else if (error.response && error.response._data && error.response._data.error) {
      errorMsg = error.response._data.error;
    } else if (error.message) {
      errorMsg = error.message;
    }
    
    errorMessage.value = errorMsg;
  } finally {
    isLoading.value = false;
  }
};

// Handle OTP verification
const handleOTPVerified = async (verificationData) => {
  try {
    // Now complete the registration with verified email
    const data = activeTab.value === "student" ? studentData.value : 
                 activeTab.value === "teacher" ? teacherData.value : companyData.value;
    
    const registrationData = {
      email: data.email,
      username: data.username,
      password: data.password,
      role: activeTab.value,
      otpVerified: true, // Mark as OTP verified
      userType: activeTab.value
    };

    // Add fields based on user type
    if (activeTab.value === "student") {
      if (data.firstName) registrationData.firstName = data.firstName;
      if (data.lastName) registrationData.lastName = data.lastName;
      if (data.phone) registrationData.phone = data.phone;
      if (data.studentId) registrationData.studentId = data.studentId;
      if (data.yearOfStudy) registrationData.yearOfStudy = data.yearOfStudy;
    } else if (activeTab.value === "teacher") {
      if (data.firstName) registrationData.firstName = data.firstName;
      if (data.lastName) registrationData.lastName = data.lastName;
      if (data.phone) registrationData.phone = data.phone;
      if (data.department) registrationData.department = data.department;
      if (data.specialization) registrationData.specialization = data.specialization;
      if (data.teacherId) registrationData.teacherId = data.teacherId;
      if (data.title) registrationData.title = data.title;
      if (data.faculty) registrationData.faculty = data.faculty;
      if (data.position) registrationData.position = data.position;
      if (data.officeRoom) registrationData.officeRoom = data.officeRoom;
      if (data.officePhone) registrationData.officePhone = data.officePhone;
    } else if (activeTab.value === "company") {
      if (data.companyName) registrationData.companyName = data.companyName;
      if (data.contactFirstName) registrationData.contactFirstName = data.contactFirstName;
      if (data.contactLastName) registrationData.contactLastName = data.contactLastName;
      if (data.phone) registrationData.phone = data.phone;
      if (data.industry) registrationData.industry = data.industry;
      if (data.address) registrationData.address = data.address;
      if (data.description) registrationData.description = data.description;
    }

    const { $api } = useNuxtApp();
    const response = await $api.post('/auth/register', registrationData);

    console.log("Registration response:", response);
    console.log("Registration response.data:", response.data);

    if (response.data.success) {
      successMessage.value = "Registration successful! You can now log in.";
      showOTPModal.value = false;
      
      // Clear form
      if (activeTab.value === "student") {
        Object.keys(studentData.value).forEach(key => {
          studentData.value[key] = "";
        });
      } else if (activeTab.value === "teacher") {
        Object.keys(teacherData.value).forEach(key => {
          teacherData.value[key] = "";
        });
      } else if (activeTab.value === "company") {
        Object.keys(companyData.value).forEach(key => {
          companyData.value[key] = "";
        });
      }
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigateTo('/auth/login');
      }, 2000);
    } else {
      errorMessage.value = response.data.error || "Registration failed";
    }
  } catch (error) {
    console.error("Registration after OTP verification error:", error);
    errorMessage.value = "Registration failed. Please try again.";
  }
};
</script>
