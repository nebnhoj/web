<template>
  <div class="navbar bg-black text-white border-b border-white">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl" href="/">John Ben</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/experience">Experience</router-link></li>
        <li><router-link to="/projects">Projects</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>
    </div>
  </div>
</template>