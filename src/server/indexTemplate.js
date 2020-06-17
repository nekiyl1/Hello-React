export const indexTemplate = (content) => 
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello React</title>
    
</head>
<body>
    <div id="react-root">${content}</div>
    <script src="static/client.js"></script>
</body>
</html>`;