<template>
  <div class="container">
    <h1>Количество учителей по предметам</h1>
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Предмет</th>
            <th>Количество учителей</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(count, subject) in teacherCounts" :key="subject">
            <td>{{ subject }}</td>
            <td>{{ count }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teacherCounts: {}
    };
  },
  created() {
    this.fetchTeacherCounts();
  },
  methods: {
    async fetchTeacherCounts() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await fetch(`http://127.0.0.1:8000/api/count-teachers-per-discipline/`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch count teachers per discipline');
        }
        this.teacherCounts = await response.json();
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
