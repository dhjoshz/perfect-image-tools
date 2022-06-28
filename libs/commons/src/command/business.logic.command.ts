import { Observable } from 'rxjs';

type CommandExecuteMethod0A<T> = () => Observable<T>;
type CommandExecuteMethod1A<T, A1> = (a1: A1) => Observable<T>;
type CommandExecuteMethod2A<T, A1, A2> = (a1: A1, a2: A2) => Observable<T>;
type CommandExecuteMethod3A<T, A1, A2, A3> = (
  a1: A1,
  a2: A2,
  a3: A3,
) => Observable<T>;
type CommandExecuteMethod4A<T, A1, A2, A3, A4> = (
  a1: A1,
  a2: A2,
  a3: A3,
  a4: A4,
) => Observable<T>;

export interface BusinessLogicCommand<
  T,
  A1 = any,
  A2 = any,
  A3 = any,
  A4 = any,
> {
  execute:
    | CommandExecuteMethod0A<T>
    | CommandExecuteMethod1A<T, A1>
    | CommandExecuteMethod2A<T, A1, A2>
    | CommandExecuteMethod3A<T, A1, A2, A3>
    | CommandExecuteMethod4A<T, A1, A2, A3, A4>;
}
