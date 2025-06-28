interface Props {
  questionBody: string;
}

const QuestionCard = ({ questionBody }: Props) => {
  return (
    <div className="bg-gray-200 text-gray-800 p-5 rounded-xl shadow-md">
      <p className="text-center text-lg font-bold">{questionBody}</p>
    </div>
  );
};

export default QuestionCard; 