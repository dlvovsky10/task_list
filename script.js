// script.js

'use strict';

document.addEventListener('DOMContentLoaded', function(){
    // Get references to the elements in the HTML page
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    // Array to store tasks
    let tasks = [];

    // Initialize 
    init();

    function init() {
        setupEventListeners();
        renderTasks();
    }

    function setupEventListeners() {
        addTaskBtn.addEventListener('click', addTask);
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        
        // Check if input is empty
        if (taskText === '') {
            alert('Please enter a task!');
            taskInput.focus();
            return;
        }
        
        const newTask = {
            id: Date.now(),
            text: taskText
        }
        
        tasks.push(newTask);
        taskInput.value = '';
        renderTasks();
        taskInput.focus();
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
    }

    function renderTasks() {
        // Clear the list
        taskList.innerHTML = '';
        // Create list items for each task
        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.className = 'task-item';
            listItem.setAttribute('data-task-id', task.id);

            const bullet = document.createElement('span');
            bullet.className = 'task-bullet';
            bullet.textContent = '• ';
            bullet.title = 'Click to delete this task';

            const taskText = document.createElement('span');
            taskText.className = 'task-text';
            taskText.textContent = task.text;

            bullet.addEventListener('click', function() {
                deleteTask(task.id);
                
            });

            listItem.appendChild(bullet);
            listItem.appendChild(taskText);
            taskList.appendChild(listItem);
        });
    }
});