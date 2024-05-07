<template>
  <div>
    <h1>Список преподавателей</h1>
    <ul>
      <li v-for="teacher in teachers" :key="teacher.id">
        <router-link :to="'/teachers/' + teacher.id">
          {{ teacher.last_name }} {{ teacher.first_name }} {{ teacher.middle_name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teachers: []
    };
  },
  created () {
    this.fetchTeachers();
  },
  methods: {
    async fetchTeachers() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token no found');
        }
        const response = await fetch('http://localhost:8000/api/teachers/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch teachers');
        }   
        const data = await response.json();
        this.teachers = data;
      } catch (error) {
        console.error(error)
      }
    }
  }
};
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid #dee2e6;
}

.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
  background-color: #343a40;
  color: #fff;
}

.table tbody + tbody {
  border-top: 2px solid #dee2e6;
}
</style>