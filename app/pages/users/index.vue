<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h5 class="mb-0 fw-bold text-dark">👥 User & Role Access Management</h5>
        <div class="text-muted small">
          Control staff credentials, role scopes, and terminal permissions (Administrator, Cashier, Manager)
        </div>
      </div>
    </div>

    <div class="card shadow-sm border-0 bg-white">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light small text-uppercase text-muted">
            <tr>
              <th scope="col" style="width: 50px;">#</th>
              <th scope="col">Staff Member</th>
              <th scope="col">Email / Username</th>
              <th scope="col" class="text-center">Role / Permissions</th>
              <th scope="col" class="text-center">Status</th>
              <th scope="col" class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in allUsers" :key="user.id">
              <td class="font-monospace text-muted small">#{{ user.id }}</td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <div class="avatar-circle rounded-circle bg-secondary bg-opacity-25 d-flex align-items-center justify-content-center text-dark fw-bold small" style="width: 34px; height: 34px;">
                    {{ user.name.charAt(0) }}
                  </div>
                  <div>
                    <div class="fw-bold text-dark small">
                      {{ user.name }}
                      <span v-if="currentUser?.id === user.id" class="badge bg-primary ms-1" style="font-size: 0.65rem;">Active Session</span>
                    </div>
                  </div>
                </div>
              </td>
              <td class="font-monospace small text-muted">{{ user.email }}</td>
              <td class="text-center">
                <span
                  class="badge text-uppercase"
                  :class="user.role === 'admin' ? 'bg-danger' : user.role === 'manager' ? 'bg-warning text-dark' : 'bg-success'"
                >
                  {{ user.role }}
                </span>
              </td>
              <td class="text-center">
                <span class="badge bg-success-subtle text-success">Active</span>
              </td>
              <td class="text-end">
                <button
                  type="button"
                  class="btn btn-sm btn-outline-primary px-3"
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
