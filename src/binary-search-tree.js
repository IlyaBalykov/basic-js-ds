const {NotImplementedError} = require('../extensions/index.js');

const {Node} = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {

  constructor() {
    this.rootTree = null
  }

  root() {
    return this.rootTree
  }

  add(data) {
    const newNode = new Node(data)
    let currentNode = this.rootTree
    if (!this.rootTree) {
      return this.rootTree = newNode
    } else {
      check(currentNode)

      function check(currentNode) {
        if (newNode.data < currentNode.data) {
          if (!currentNode.left) {
            return currentNode.left = newNode
          } else {
            check(currentNode.left)
          }
        } else {
          if (!currentNode.right) {
            return currentNode.right = newNode
          } else {
            check(currentNode.right)
          }
        }
      }
    }
  }

  has(data) {
    let isHas = false
    if (this.rootTree) {
      check(this.rootTree)

      function check(currentNode) {
        if (currentNode && (data < currentNode.data)) {
          check(currentNode.left)
        } else if (currentNode && (data > currentNode.data)) {
          check(currentNode.right)
        } else if (currentNode && (data === currentNode.data)) {
          isHas = true
        }
      }
    }
    return isHas
  }

  find(data) {
    let isFind = null
    check(this.rootTree)

    function check(currentNode) {
      if (currentNode && data) {
        if (currentNode && (data < currentNode.data)) {
          check(currentNode.left)
        } else if (currentNode && (data > currentNode.data)) {
          check(currentNode.right)
        } else if (currentNode && (data === currentNode.data)) {
          isFind = currentNode
        }
      }
    }

    return isFind
  }

  remove(data) {
    this.rootTree = removeNode(this.rootTree, data)

    function removeNode(currentNode, data) {
      if (!currentNode) {
        return null
      } else if (data < currentNode.data) {
        currentNode.left = removeNode(currentNode.left, data)
        return currentNode
      } else if (data > currentNode.data) {
        currentNode.right = removeNode(currentNode.right, data)
        return currentNode
      } else {
        if (!currentNode.left && !currentNode.right) {
          return null
        } else if (!currentNode.left) {
          currentNode = currentNode.right
          return currentNode
        } else if (!currentNode.right) {
          currentNode = currentNode.left
          return currentNode
        }

        let minRight = currentNode.right

        while (minRight.left) {
          minRight = minRight.left
        }

        currentNode.data = minRight.data

        currentNode.right = removeNode(currentNode.right, minRight.data)

        return currentNode
      }
    }
  }

  min() {
    let currentNode = this.rootTree
    while (currentNode.left) {
      currentNode = currentNode.left
    }
    return currentNode.data
  }


  max() {
    let currentNode = this.rootTree
    while (currentNode.right) {
      currentNode = currentNode.right
    }
    return currentNode.data
  }
}

module.exports = {
  BinarySearchTree
};