# Assignment 05

## How to run
```shell
# Please run this script in your terminal, and visit the localhost url in the output

npm start
```

## File changes
Mainly in:  
* [\src](https://github.com/ken-gy-leung/jra-full-stack/tree/asgn-05/assignments/asgn-05-react-todo-list-app/src) 

## Content
### 目标：   
基于 React 创建一个简易的任务清单应用（To-Do List App）。该应用应具有基本的增删改查功能，并且界面应友好、交互流畅。

### 步骤：  
1. **初始化**你的 React 项目使用 **create-react-app** 来初始化你的应用框架。
2. **创建一个 Task 组件**设计一个展示单个任务的组件。该组件应显示任务内容和一个完成按钮。
3. **使用 State 管理任务列表**在 App 组件中使用 **state** 来存储任务列表。
4. 提供一个输入框，使用户可以添加新任务到 **state** 中。
5. **利用 Props 传递数据**将单个任务数据通过 **props** 传递给 Task 组件，使其能够正确展示。
6. **事件处理**为完成按钮添加 **onClick** 事件，当用户点击时，标记任务为已完成。
7. 为输入框添加 **onChange** 事件，实时捕捉用户输入的内容。
8. **条件渲染**利用条件渲染，为已完成的任务添加删除线或更改其颜色。
9. 提供一个按钮，使用户可以过滤查看已完成或未完成的任务。
10. **美化你的应用**使用 CSS（或你之前学过的 SCSS）为你的应用添加一些基本样式。你可以选择一个明亮的色调，或使用渐变色，使其更具吸引力。

### 扩展挑战：  
1. 使用 React 的 **localStorage** API，使任务在页面刷新后仍然可以保存。
2. 添加任务的编辑功能。
3. 实现任务的拖放排序功能。