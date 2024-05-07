import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import RegistrationPage from './components/RegistrationPage.vue';
import HomePage from './components/HomePage.vue';
import ClassesPage from './components/ClassesPage.vue';
import TeachersPage from './components/TeachersPage.vue';
import ClassPage from './components/ClassPage.vue';
import StudentPage from './components/StudentPage.vue';
import TeacherPage from './components/TeacherPage.vue';
import AddStudent from './components/AddStudent.vue';
import AddTeacher from './components/AddTeacher.vue';
import AddLesson from './components/AddLesson.vue';
import RoomsInfo from './components/RoomsInfo.vue';
import SubjectsInfo from './components/SubjectsInfo.vue';


const routes = [
    {path: '/login', component: LoginPage},
    {path: '/registration', component: RegistrationPage},
    {path: '/home', component: HomePage},
    {path: '/classes', component: ClassesPage},
    {path: '/teachers', component: TeachersPage},
    {path: '/classes/:id', component: ClassPage},
    {path: '/students/:id', component: StudentPage},
    {path: '/teachers/:id', component: TeacherPage},
    {path: '/add-student', component: AddStudent},
    {path: '/add-teacher', component: AddTeacher},
    {path: '/add-lesson', component: AddLesson},
    {path: '/rooms-info', component: RoomsInfo},
    {path: '/subjects-info', component: SubjectsInfo},   
    {path: '/:catchAll(.*)', redirect: '/login'}
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;
