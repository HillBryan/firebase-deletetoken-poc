<template>
  <div class="container">
    <h1>Firebase Cloud Messaging</h1>
    <div class="button-group">
      <button class="btn btn-primary" @click="generateToken">
        Generate FCM Token
      </button>
      <button class="btn btn-danger" @click="deleteToken">
        Delete FCM Token
      </button>
    </div>
  </div>
</template>

<script>
  import { registerAndGetToken, removeToken } from "./services/FirebaseService";

  export default {
    name: "App",
    methods: {
      async generateToken() {
        try {
          const token = await registerAndGetToken();
          alert('FCM Token: ' + token);
        } catch (error) {
          alert('Error generating token: ' + error.message);
        }
      },
      async deleteToken() {
        try {
          await removeToken();
          alert('Token deleted successfully');
        } catch (error) {
          alert('Error deleting token: ' + error.message);
        }
      },
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .container {
    background: white;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 90%;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 30px;
    color: #2c3e50;
  }

  .button-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .btn {
    padding: 14px 28px;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  .btn:active {
    transform: translateY(0);
  }

  .btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .btn-primary:hover {
    background: linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%);
  }

  .btn-danger {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
  }

  .btn-danger:hover {
    background: linear-gradient(135deg, #e082ea 0%, #e4465b 100%);
  }
</style>
