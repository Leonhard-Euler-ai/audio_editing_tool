# audio_editing_tool

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### BUG_LOG
1. 初始化时network/request.js中无法获取token, 初始化时router/index.js中无法获取登录状态,
  两者都因`Vue.prototype.state... `的`state`未定义，目前为找到解决方案（getters.js已试无用）
2. 因1，导致前端输入/main能直接跳转到主界面，但若从/login输入账号密码则是正常处理流程
3. 文件上传成功或失败时，element-ui自带的上传行为会从状态码判断成功与否，
   但是后端返回的真正状态码在响应体的code中，因此会出现`$message("上传成功")`,实则仍未登录或上传失败
4. 需调整上传状态样式，略调测试input(太靠左了)
