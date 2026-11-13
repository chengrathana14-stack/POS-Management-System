<template>
  <div>
    <!-- Page Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h5 class="mb-0 fw-bold text-dark">👥 User & Role Access Management</h5>
        <div class="text-muted small">
          Control staff credentials, role scopes, and terminal permissions (Cashier, Manager, Admin)
        </div>
      </div>
    </div>

    <!-- Users Table Card -->
    <div class="card shadow-sm border-0 bg-white rounded-4 overflow-hidden">
      <div class="table-responsive px-3">
        <table class="table table-hover align-middle mb-0">
          <thead class="small text-uppercase text-muted" style="border-top: 1px solid #f1f5f9; font-size: 0.72rem; letter-spacing: 0.04em;">
            <tr>
              <th scope="col" class="ps-3" style="width: 50px;">#</th>
              <th scope="col">Staff Member</th>
              <th scope="col">Email / Username</th>
              <th scope="col" class="text-center">Role / Permissions</th>
              <th scope="col" class="text-center">Terminal Status</th>
              <th scope="col" class="text-end pe-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in allUsers" :key="user.id">
              <td class="ps-3 font-monospace text-muted small">#{{ user.id }}</td>
              <td>
                <div class="d-flex align-items-center gap-3">
                  <div class="avatar-circle rounded-circle d-flex align-items-center justify-content-center text-white fw-bold small flex-shrink-0" style="width: 36px; height: 36px; background: linear-gradient(135deg, #3b82f6, #1d4ed8);">
                    {{ user.name.charAt(0) }}
                  </div>
                  <div>
                    <div class="fw-bold text-dark small d-flex align-items-center gap-2">
                      <span>{{ user.name }}</span>
                      <span v-if="currentUser?.id === user.id" class="badge bg-primary rounded-pill small" style="font-size: 0.65rem;">
                        Current Session
                      </span>
                    </div>
                    <div class="text-muted small" style="font-size: 0.72rem;">Last active: Just now</div>
                  </div>
                </div>
              </td>
              <td class="font-monospace small text-muted">{{ user.email }}</td>
              <td class="text-center">
                <span
                  class="badge text-uppercase rounded-pill px-3 py-1 font-monospace"
                  :class="user.role === 'admin' ? 'bg-danger-subtle text-danger' : user.role === 'manager' ? 'bg-warning-subtle text-warning' : 'bg-primary-subtle text-primary'"
                  style="font-size: 0.75rem;"
                >
                  {{ user.role }}
                </span>
              </td>
              <td class="text-center">
                <span class="badge bg-success-subtle text-success rounded-pill px-2 py-1 small">
                  ● Active
                </span>
              </td>
              <td class="text-end pe-3">
                <button
                  type="button"
                  class="btn btn-sm rounded-pill px-3 fw-semibold font-monospace"
                  :class="currentUser?.id === user.id ? 'btn-light border text-muted' : 'btn-outline-primary'"
                  :disabled="currentUser?.id === user.id"
                  @click="switchRole(user.role)"
                >
                  {{ currentUser?.id === user.id ? 'Logged In' : 'Switch User' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userAuth } from '~/composables/userAuth'

const { allUsers, currentUser, switchRole } = userAuth()
</script>
