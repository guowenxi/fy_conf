module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  // extends: "eslint:recommended",
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  parser:"",
  plugins:["react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
};
