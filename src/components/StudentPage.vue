<template>
  <div class="container">
    <h1>Редактировать информацию о студенте</h1>
    <form @submit.prevent="updateStudent" class="form">
      <div class="form-group">
        <label for="lastName">Фамилия:</label>
        <input type="text" id="lastName" v-model="formData.lastName" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="firstName">Имя:</label>
        <input type="text" id="firstName" v-model="formData.firstName" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="gender">Пол:</label>
        <select id="gender" v-model="formData.gender" class="form-control" required>
          <option value="M">M</option>
          <option value="F">F</option>
        </select>
      </div>
      <div class="form-group">
        <label for="class">Класс:</label>
        <select id="class" v-model="formData.class" class="form-control" required>
          <option v-for="cl in classes" :key="cl.id" :value="cl.id">{{cl.number}}{{cl.letter}}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Сохранить</button>
      <button @click="deleteStudent" class="btn btn-danger">Удалить студента</button>
    </form>
    <h2>Оценки ученика</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Предмет</th>
          <th>Оценка</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(grade, index) in studentGrades" :key="index">
          <td>{{ grade.lesson.subject.name }}</td>
          <td>
            <select v-model="grade.grade" @change="updateGrade(grade)">
              <option v-for="i in [2, 3, 4, 5]" :value="i" v-bind:key="i">{{ i }}</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        gender: 'M',
        class: ''
      },
      studentGrades: [],
      classes: []
    };
  },
  created() {
    const studentId = this.$route.params.id;
    this.fetchStudent(studentId);
    this.fetchStudentGrades(studentId);
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
    async fetchStudent(studentId) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await fetch(`http://localhost:8000/api/students/${studentId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch student');
        }
        const data = await response.json();
        this.formData.firstName = data.first_name;
        this.formData.lastName = data.last_name;
        this.formData.gender = data.gender;
        this.formData.class = data.class_assigned;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchStudentGrades(studentId) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await fetch(`http://localhost:8000/api/student-grades/${studentId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch student grades');
        }
        this.studentGrades = await response.json();
      } catch (error) {
        console.error(error);
      }
    },
    async updateStudent() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const studentId = this.$route.params.id;
        const response = await fetch(`http://localhost:8000/api/students/${studentId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
          body: JSON.stringify({
            first_name: this.formData.firstName,
            last_name: this.formData.lastName,
            gender: this.formData.gender,
            class_assigned: this.formData.class
          })
        });
        if (!response.ok) {
          throw new Error('Failed to update student');
        }
        location.reload();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteStudent() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      const studentId = this.$route.params.id;
      const response = await fetch(`http://localhost:8000/api/students/${studentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete student');
      }
      this.$router.push(`/classes/${this.formData.class}`);
      } catch (error) {
        console.error(error);
      }
    },
    async updateGrade(grade) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await fetch(`http://localhost:8000/api/grades/${grade.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
          body: JSON.stringify({ 
            grade: grade.grade, 
            student: grade.student,
            lesson: grade.lesson.id
            })
        });
        if (!response.ok) {
          throw new Error('Failed to update grade');
        }
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

.form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
}
</style>
