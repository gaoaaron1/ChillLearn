class MathQuestionFormatter {
  // Function to insert space between concatenated words (CamelCase detection)
  static formatSpaces(question) {
    let formattedQuestion = question.replace(/([a-z])([A-Z])/g, '$1 $2');
    formattedQuestion = formattedQuestion.replace(/(\d)([a-zA-Z])/g, '$1 $2');
    formattedQuestion = formattedQuestion.replace(/([a-zA-Z])(\d)/g, '$1 $2');
    return formattedQuestion;
  }

  // Function to format fractions to LaTeX
  static formatFraction(question) {
    // Match fractions like 2/4 and convert them to LaTeX form \frac{2}{4}
    return question.replace(/(\d+)\s*\/\s*(\d+)/g, (match, p1, p2) => `\\frac{${p1}}{${p2}}`);
  }

  // Function to format exponents to LaTeX
  static formatExponent(question) {
    // Match exponents like 2^2 and convert them to LaTeX form 2^{2}
    return question.replace(/(\d+)\s*\^(\s*\d+)/g, (match, p1, p2) => `${p1}^{${p2.trim()}}`);
  }

  // Function to apply all formatting including fractions and exponents
  static formatMath(question) {
    // Apply spaces for better readability first
    question = this.formatSpaces(question);

    // Then format fractions and exponents
    question = this.formatFraction(question);
    question = this.formatExponent(question);

    return question;
  }

  // Function to detect if the string has LaTeX content (fractions or exponents)
  static isLaTeX(content) {
    return /\\frac|^{.*}$/.test(content);
  }

  // Function to format data containing questions and options
  static formatQuestionData(data) {
    const formattedData = { ...data };
    Object.keys(data).forEach((grade) => {
      Object.keys(data[grade]).forEach((subject) => {
        Object.keys(data[grade][subject]).forEach((unit) => {
          data[grade][subject][unit] = data[grade][subject][unit].map((item) => {
            item.question = this.formatMath(item.question); // Format the question with LaTeX
            if (item.options) {
              item.options = item.options.map((option) => this.formatMath(option)); // Format options as well
            }
            return item;
          });
        });
      });
    });
    return formattedData;
  }
}

export default MathQuestionFormatter;
