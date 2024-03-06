<template>
    <div>
        <h1>Login</h1>
        <button @click="login('admin')">ad</button>
        <button @click="login('editor')">ed</button>
        <button @click="login('viewer')">vi</button>
    </div>
</template>

<script>
import { jwtDecode} from 'jwt-decode'
export default {
    name: 'Login',
    methods: {
        login(role) {
            let token;
            switch(role) {
                case 'admin':
                    token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJTVVBFUl9BRE1JTl9ST0xFIn1dLCJpYXQiOjE3MDk2ODgxODUsImV4cCI6LTYzMzUwNTIwMTI1OTAyMzl9.RFjTd5XR4JqtwNqTnMIM3b_0inUOuQZl1rX50fGII8Y';
                    break;
                case 'editor':
                    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6ImVkaXRvciJ9.Yhl4qXl2BYctoSfOZuL_ELpxX5d0VAKCkKTk3sLlj_0';
                    break;
                case 'viewer':
                    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6InZpZXdlciJ9.12Cv6EzG6Z8DjI9Y8KficGMyd8ijp-WCsZCN2gRrUnM';
                    break;
            }
            localStorage.setItem('token', token);
            const decoded = jwtDecode(token);
            this.redirectUser(decoded.roles[0].authority);

        },
        redirectUser(role) {
            switch(role) {
                case 'SUPER_ADMIN_ROLE':
                    this.$router.push('/admin');
                    break;
                case 'editor':
                    this.$router.push('/editor');
                    break;
                case 'viewer':
                    this.$router.push('/viewer');
                    break;
            }
        }
    }
}
</script>

<style>

</style>