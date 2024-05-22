const calculateExercises = (daily_exercises: number[], target: number): Result => {
    const periodLength = daily_exercises.length;
    const trainingDays = daily_exercises.filter(d => d > 0).length;
    const average = daily_exercises.reduce((a, b) => a + b, 0) / periodLength;
    const success = average >= target;
    const rating = average < target ? 1 : average === target ? 2 : 3;
    const ratingDescription = rating === 1 ? 'You need to do more exercises' : rating === 2 ? 'not too bad but could be better' : 'Well done!';
  
    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average
    };
  };

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface ExerciseValues {
    daily_exercises: number[];
    target: number;
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const target = Number(args[2]);
    const daily_exercises = args.slice(3).map(d => {
      if (isNaN(Number(d))) {
        throw new Error('Provided values were not numbers!');
      }
      return Number(d);
    });
  
    return {
      daily_exercises,
      target
    };
  };

try {
  const { daily_exercises, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(daily_exercises, target));
} catch (e) {    
  console.log('Error, message: ', e.message);
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

export default calculateExercises;