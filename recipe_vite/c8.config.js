// c8.config.js
module.exports = {
    reporter: ['text', 'html'], // Generates both terminal and HTML reports
    include: ['src/**/*.{js,jsx}'], // Only test your src files
    exclude: ['**/tests/**'], // Optionally exclude your test files from coverage
    all: true, // Ensure all files are included in coverage even if not imported
  };
  