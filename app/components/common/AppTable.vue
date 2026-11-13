<template>
  <div class="card shadow-sm border-0">
    <div class="table-responsive">
      <table class="table table-hover align-middle mb-0">
        <thead class="table-light small text-uppercase text-muted">
          <slot name="header" />
        </thead>
        <tbody>
          <slot name="body" />
        </tbody>
      </table>
    </div>
  </div>
</template>

