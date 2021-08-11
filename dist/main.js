/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\nvar project1 = createProject('The Odin Project', 'learn to be a front-end developer', 'high');\nvar task1 = createTask('Project: TODO List', 'final assignment of the Javascript basics course', 'tomorrow', 'high', project1);\nvar task2 = createTask('Do it!', 'Just do it!', 'tomorrow', 'high', project1); //create a new task\n\nfunction createTask(title, desc, dueDate, priority, parentProject) {\n  var newTask = {\n    title: title,\n    desc: desc,\n    dueDate: dueDate,\n    priority: priority,\n    parentProject: parentProject\n  };\n  newTask.isFinished = false;\n  parentProject.getTasks().push(newTask);\n  return newTask;\n} //create a new project\n\n\nfunction createProject(title, desc, priority) {\n  var taskArr = [];\n  console.log(taskArr);\n\n  function getTasks() {\n    return taskArr;\n  }\n\n  function getTask(i) {\n    return taskArr[i];\n  }\n\n  function finishTask(i) {\n    taskArr[i].isFinished = true;\n    return taskArr[i];\n  }\n\n  function deleteTask(i) {\n    taskArr[i].splice(i, 1);\n  }\n\n  return {\n    title: title,\n    desc: desc,\n    priority: priority,\n    getTasks: getTasks,\n    getTask: getTask,\n    finishTask: finishTask,\n    deleteTask: deleteTask\n  };\n}\n\nvar newTaskBtn = document.querySelector('.new-task-btn');\nvar newTaskFormWrap = document.querySelector('.new-task-form-wrap');\nnewTaskBtn.addEventListener('click', function (e) {\n  return newTaskFormWrap.classList.toggle('visible');\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6IjtBQUFBO0FBR0EsSUFBTUMsUUFBUSxHQUFHQyxhQUFhLENBQUMsa0JBQUQsRUFBcUIsbUNBQXJCLEVBQTBELE1BQTFELENBQTlCO0FBRUEsSUFBTUMsS0FBSyxHQUFHQyxVQUFVLENBQUMsb0JBQUQsRUFBdUIsa0RBQXZCLEVBQTJFLFVBQTNFLEVBQXVGLE1BQXZGLEVBQStGSCxRQUEvRixDQUF4QjtBQUNBLElBQU1JLEtBQUssR0FBR0QsVUFBVSxDQUFDLFFBQUQsRUFBVyxhQUFYLEVBQTBCLFVBQTFCLEVBQXNDLE1BQXRDLEVBQThDSCxRQUE5QyxDQUF4QixFQUVBOztBQUNBLFNBQVNHLFVBQVQsQ0FBcUJFLEtBQXJCLEVBQTRCQyxJQUE1QixFQUFrQ0MsT0FBbEMsRUFBMkNDLFFBQTNDLEVBQXFEQyxhQUFyRCxFQUFvRTtBQUVoRSxNQUFNQyxPQUFPLEdBQUc7QUFBQ0wsSUFBQUEsS0FBSyxFQUFMQSxLQUFEO0FBQVFDLElBQUFBLElBQUksRUFBSkEsSUFBUjtBQUFjQyxJQUFBQSxPQUFPLEVBQVBBLE9BQWQ7QUFBdUJDLElBQUFBLFFBQVEsRUFBUkEsUUFBdkI7QUFBaUNDLElBQUFBLGFBQWEsRUFBYkE7QUFBakMsR0FBaEI7QUFDQUMsRUFBQUEsT0FBTyxDQUFDQyxVQUFSLEdBQXFCLEtBQXJCO0FBRUFGLEVBQUFBLGFBQWEsQ0FBQ0csUUFBZCxHQUF5QkMsSUFBekIsQ0FBOEJILE9BQTlCO0FBRUEsU0FBT0EsT0FBUDtBQUNILEVBRUQ7OztBQUNBLFNBQVNULGFBQVQsQ0FBd0JJLEtBQXhCLEVBQStCQyxJQUEvQixFQUFxQ0UsUUFBckMsRUFBK0M7QUFDM0MsTUFBTU0sT0FBTyxHQUFHLEVBQWhCO0FBQ0FDLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixPQUFaOztBQUVBLFdBQVNGLFFBQVQsR0FBb0I7QUFDaEIsV0FBT0UsT0FBUDtBQUNIOztBQUVELFdBQVNHLE9BQVQsQ0FBaUJDLENBQWpCLEVBQW9CO0FBQ2YsV0FBT0osT0FBTyxDQUFDSSxDQUFELENBQWQ7QUFDSjs7QUFFRCxXQUFTQyxVQUFULENBQXFCRCxDQUFyQixFQUF3QjtBQUNwQkosSUFBQUEsT0FBTyxDQUFDSSxDQUFELENBQVAsQ0FBV1AsVUFBWCxHQUF3QixJQUF4QjtBQUNBLFdBQU9HLE9BQU8sQ0FBQ0ksQ0FBRCxDQUFkO0FBQ0g7O0FBRUQsV0FBU0UsVUFBVCxDQUFxQkYsQ0FBckIsRUFBd0I7QUFDcEJKLElBQUFBLE9BQU8sQ0FBQ0ksQ0FBRCxDQUFQLENBQVdHLE1BQVgsQ0FBa0JILENBQWxCLEVBQXFCLENBQXJCO0FBQ0g7O0FBRUQsU0FBTztBQUFDYixJQUFBQSxLQUFLLEVBQUxBLEtBQUQ7QUFBUUMsSUFBQUEsSUFBSSxFQUFKQSxJQUFSO0FBQWNFLElBQUFBLFFBQVEsRUFBUkEsUUFBZDtBQUF3QkksSUFBQUEsUUFBUSxFQUFSQSxRQUF4QjtBQUFrQ0ssSUFBQUEsT0FBTyxFQUFQQSxPQUFsQztBQUEyQ0UsSUFBQUEsVUFBVSxFQUFWQSxVQUEzQztBQUF1REMsSUFBQUEsVUFBVSxFQUFWQTtBQUF2RCxHQUFQO0FBQ0g7O0FBR0QsSUFBTUUsVUFBVSxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBbkI7QUFDQSxJQUFNQyxlQUFlLEdBQUdGLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixxQkFBdkIsQ0FBeEI7QUFDQUYsVUFBVSxDQUFDSSxnQkFBWCxDQUE0QixPQUE1QixFQUFxQyxVQUFDQyxDQUFEO0FBQUEsU0FBT0YsZUFBZSxDQUFDRyxTQUFoQixDQUEwQkMsTUFBMUIsQ0FBaUMsU0FBakMsQ0FBUDtBQUFBLENBQXJDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9wLXRvZG9saXN0Ly4vc3JjL2luZGV4LmpzP2I2MzUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZvcm1hdCBmcm9tICdkYXRlLWZucydcblxuXG5jb25zdCBwcm9qZWN0MSA9IGNyZWF0ZVByb2plY3QoJ1RoZSBPZGluIFByb2plY3QnLCAnbGVhcm4gdG8gYmUgYSBmcm9udC1lbmQgZGV2ZWxvcGVyJywgJ2hpZ2gnKVxuXG5jb25zdCB0YXNrMSA9IGNyZWF0ZVRhc2soJ1Byb2plY3Q6IFRPRE8gTGlzdCcsICdmaW5hbCBhc3NpZ25tZW50IG9mIHRoZSBKYXZhc2NyaXB0IGJhc2ljcyBjb3Vyc2UnLCAndG9tb3Jyb3cnLCAnaGlnaCcsIHByb2plY3QxKVxuY29uc3QgdGFzazIgPSBjcmVhdGVUYXNrKCdEbyBpdCEnLCAnSnVzdCBkbyBpdCEnLCAndG9tb3Jyb3cnLCAnaGlnaCcsIHByb2plY3QxKVxuXG4vL2NyZWF0ZSBhIG5ldyB0YXNrXG5mdW5jdGlvbiBjcmVhdGVUYXNrICh0aXRsZSwgZGVzYywgZHVlRGF0ZSwgcHJpb3JpdHksIHBhcmVudFByb2plY3QpIHtcblxuICAgIGNvbnN0IG5ld1Rhc2sgPSB7dGl0bGUsIGRlc2MsIGR1ZURhdGUsIHByaW9yaXR5LCBwYXJlbnRQcm9qZWN0fVxuICAgIG5ld1Rhc2suaXNGaW5pc2hlZCA9IGZhbHNlXG5cbiAgICBwYXJlbnRQcm9qZWN0LmdldFRhc2tzKCkucHVzaChuZXdUYXNrKVxuICAgIFxuICAgIHJldHVybiBuZXdUYXNrXG59XG5cbi8vY3JlYXRlIGEgbmV3IHByb2plY3RcbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3QgKHRpdGxlLCBkZXNjLCBwcmlvcml0eSkge1xuICAgIGNvbnN0IHRhc2tBcnIgPSBbXVxuICAgIGNvbnNvbGUubG9nKHRhc2tBcnIpXG4gICAgXG4gICAgZnVuY3Rpb24gZ2V0VGFza3MoKSB7XG4gICAgICAgIHJldHVybiB0YXNrQXJyICAgXG4gICAgfSBcblxuICAgIGZ1bmN0aW9uIGdldFRhc2soaSkge1xuICAgICAgICAgcmV0dXJuIHRhc2tBcnJbaV1cbiAgICB9XG4gICAgIFxuICAgIGZ1bmN0aW9uIGZpbmlzaFRhc2sgKGkpIHtcbiAgICAgICAgdGFza0FycltpXS5pc0ZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRhc2tBcnJbaV1cbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gZGVsZXRlVGFzayAoaSkge1xuICAgICAgICB0YXNrQXJyW2ldLnNwbGljZShpLCAxKVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4ge3RpdGxlLCBkZXNjLCBwcmlvcml0eSwgZ2V0VGFza3MsIGdldFRhc2ssIGZpbmlzaFRhc2ssIGRlbGV0ZVRhc2t9XG59XG5cblxuY29uc3QgbmV3VGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctdGFzay1idG4nKVxuY29uc3QgbmV3VGFza0Zvcm1XcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy10YXNrLWZvcm0td3JhcCcpXG5uZXdUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IG5ld1Rhc2tGb3JtV3JhcC5jbGFzc0xpc3QudG9nZ2xlKCd2aXNpYmxlJykgKVxuIl0sIm5hbWVzIjpbImZvcm1hdCIsInByb2plY3QxIiwiY3JlYXRlUHJvamVjdCIsInRhc2sxIiwiY3JlYXRlVGFzayIsInRhc2syIiwidGl0bGUiLCJkZXNjIiwiZHVlRGF0ZSIsInByaW9yaXR5IiwicGFyZW50UHJvamVjdCIsIm5ld1Rhc2siLCJpc0ZpbmlzaGVkIiwiZ2V0VGFza3MiLCJwdXNoIiwidGFza0FyciIsImNvbnNvbGUiLCJsb2ciLCJnZXRUYXNrIiwiaSIsImZpbmlzaFRhc2siLCJkZWxldGVUYXNrIiwic3BsaWNlIiwibmV3VGFza0J0biIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIm5ld1Rhc2tGb3JtV3JhcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiY2xhc3NMaXN0IiwidG9nZ2xlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;