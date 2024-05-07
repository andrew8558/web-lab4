<template>
  <div class="container">
    <h1>Список классов</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Класс</th>
          <th>Учитель</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="classItem in classes" :key="classItem.id">
          <td>
            <router-link :to="'/classes/' + classItem.id">{{ classItem.number }}{{ classItem.letter }}</router-link>
          </td>
          <td>{{ classItem.teacher.last_name }} {{ classItem.teacher.first_name }} {{ classItem.teacher.middle_name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classes: []
    };
  },
  created() {
    this.fetchClasses();
  },
  methods: {
    async fetchClasses() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await fetch('http://localhost:8000/api/classes/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch classes');
        }
        const data = await response.json();
        this.classes = data;
      } catch (error) {
        console.error(error);
      }
    },
    async getTeacherName(teacherId) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await fetch(`http://localhost:8000/api/teachers/${teacherId}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch teacher');
        }
        const data = await response.json();
        return `${data.first_name} ${data.middle_name} ${data.last_name}`;
      } catch (error) {
        console.error(error);
        return 'Unknown';
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