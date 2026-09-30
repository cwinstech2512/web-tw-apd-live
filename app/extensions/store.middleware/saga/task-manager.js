/* @flow */
import {
  map,
  append as ap,
  slice,
  last,
  remove as rm,
  findIndex,
  propEq,
  pipe,
  __
} from 'ramda';

/**
 * taskManager
 * @desc 任務管理物件，給 watcher 用的
 */
const taskManager = {
  /* 佇列 */
  taskQueue: [],

  /* 找尋任務 */
  find: (prop: string, target: any) =>
    findIndex(propEq(prop, target))(taskManager.taskQueue),

  /* 新增任務 */
  append: (task: any) => {
    task.done.then(() => {
      const index: number = taskManager.find('id', task.id);
      if (index > -1) taskManager.remove(index);
    });
    taskManager.taskQueue = ap(task, taskManager.taskQueue);
  },

  /* 清除所有任務 */
  clear: () => {
    taskManager.taskQueue = [];
  },

  /* 移除指定任務，用在被取消的時候，從佇列中移除 */
  remove: (index: number) => {
    taskManager.taskQueue = rm(index, 1, taskManager.taskQueue);
  },

  /* 移除最末筆任務，通常用在執行完畢後從佇列中移除 */
  pop: () => {
    taskManager.taskQueue = slice(0, -1, taskManager.taskQueue);
  }
};

export default taskManager;
