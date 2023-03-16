import { parseISO, format } from 'date-fns';

interface DateProps {
  dateString: string;
}

export default function Date(props: DateProps) {
  const date = parseISO(props.dateString);
  return (
    <time dateTime={props.dateString}>{format(date, 'LLLL d, yyyy')}</time>
  );
}
