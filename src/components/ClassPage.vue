<template>
  <div class="container">
    <h1>Информация о классе</h1>
    <div v-if="classReport">
      <p>Класс: {{ classReport.class_name }}</p>
      <p>Классный руководитель: {{ classReport.class_teacher }}</p>
      <p>Количество студентов: {{ classReport.total_students }}</p>
      <p>Количество мальчиков: {{ genderCounts.M }}</p>
      <p>Количество девочек: {{ genderCounts.F }}</p>

      <h2>Список учеников</h2>
      <ul>
        <li v-for="student in students" :key="student.id">
          <router-link :to="'/students/' + student.id">{{ student.last_name }} {{ student.first_name }}</router-link>
        </li>
      </ul>

      <h2>Средние оценки по предметам</h2>
      <table>
        <thead>
          <tr>
            <th>Предмет</th>
            <th>Средняя оценка</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(averageGrade, subject) in classReport.subject_average_grade" :key="subject">
            <td>{{ subject }}</td>
            <td>{{ averageGrade }}</td>
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
      students: [],
      classReport: {},
      genderCounts: {}
    };
  },
  created () {
    const classId = this.$route.params.id;
    this.fetchStudents(classId);
    this.fetchClassReport(classId);
    this.fetchGenderCounts(classId);
  },
  methods: {
    async fetchStudents(classId) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await fetch(`http://localhost:8000/api/students/?class_id=${classId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }   
        const data = await response.json();
        this.students = data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchClassReport(classId) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await fetch(`http://localhost:8000/api/class-report/${classId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch class report');
        }   
        const data = await response.json();
        this.classReport = data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchGenderCounts(classId) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await fetch(`http://localhost:8000/api/gender-counts-per-class/${classId}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch gender counts');
        }   
        const data = await response.json();
        this.genderCounts = data;
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

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

.router-link-exact-active {
  font-weight: bold;
}

.class-info {
  margin-top: 20px;
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
