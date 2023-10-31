export const getColor = (number) => {
    switch (true) {
      case number <= 0 || number <= 0.2:
        return 'green';
      case number <= 0.2:
        return 'green50';
      case number <= 0.4:
        return 'green100';
      case number <= 0.8:
        return 'yellow';
      case  number > 0.8:
        return 'red';
      default:
        return 'Invalid number';
    }
  }