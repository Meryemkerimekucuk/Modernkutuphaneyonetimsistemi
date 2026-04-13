import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Books } from './pages/Books';
import { BookDetail } from './pages/BookDetail';
import { AddBook } from './pages/AddBook';
import { EditBook } from './pages/EditBook';
import { Members } from './pages/Members';
import { MemberDetail } from './pages/MemberDetail';
import { AddMember } from './pages/AddMember';
import { EditMember } from './pages/EditMember';
import { Borrowings } from './pages/Borrowings';
import { BorrowBook } from './pages/BorrowBook';
import { Returns } from './pages/Returns';
import { OverdueBooks } from './pages/OverdueBooks';
import { Categories } from './pages/Categories';
import { Authors } from './pages/Authors';
import { Publishers } from './pages/Publishers';
import { Reports } from './pages/Reports';
import { Statistics } from './pages/Statistics';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'books', Component: Books },
      { path: 'books/add', Component: AddBook },
      { path: 'books/:id', Component: BookDetail },
      { path: 'books/:id/edit', Component: EditBook },
      { path: 'members', Component: Members },
      { path: 'members/add', Component: AddMember },
      { path: 'members/:id', Component: MemberDetail },
      { path: 'members/:id/edit', Component: EditMember },
      { path: 'borrowings', Component: Borrowings },
      { path: 'borrowings/new', Component: BorrowBook },
      { path: 'returns', Component: Returns },
      { path: 'overdue', Component: OverdueBooks },
      { path: 'categories', Component: Categories },
      { path: 'authors', Component: Authors },
      { path: 'publishers', Component: Publishers },
      { path: 'reports', Component: Reports },
      { path: 'statistics', Component: Statistics },
      { path: 'settings', Component: Settings },
      { path: 'profile', Component: Profile },
    ],
  },
]);
