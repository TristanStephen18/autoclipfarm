import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import AuthPage from "./pages/auth/Auth";
import { Main } from "./pages/Main";
import { Toaster } from "react-hot-toast";
import RequireAuth from "./lib/utils/SessionChecker";
import { VideoAnalyzerPage } from "./pages/trials/GeminiVideoAnalyzer";
import VideoEditor from "./pages/trials/Ffmpeg";
import QuoteEditorPage from "./pages/trials/QuoteEditor";
import GoogleLoading from "./pages/auth/GoogleLoading";
import TermsOfService from "./pages/static/TermsOfService";
import PrivacyPolicy from "./pages/static/PrivacyPolicy";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      <Switch>
        <Route path="/" component={AuthPage} />
        <Route path="/login" component={AuthPage} />
        <Route path="/gemini" component={VideoAnalyzerPage} />
        <Route path="/ffmpeg" component={VideoEditor} />
        <Route path="/quote" component={QuoteEditorPage} />
        <Route path="/loading" component={GoogleLoading} />
        <Route path="/terms-of-service" component={TermsOfService}/>
        <Route path="/privacy-policy" component={PrivacyPolicy}/>

        <RequireAuth>
          <Route path="/home" component={Main} />
        </RequireAuth>

        <Route>
          {() => <div className="p-6 text-center">404 – Page not found</div>}
        </Route>
      </Switch>
    </QueryClientProvider>
  );
}

// function QuerySample() {
//   const { isPending, data, isError, isSuccess } = useQuery({
//     queryKey: ["hello"],
//     queryFn: () =>
//       fetch("http://localhost:3000/hello").then((res) => res.json()),
//   });

//   if (isPending) {
//     return "Pending data fetching";
//   }

//   if (isError) {
//     return "Error fetching data";
//   }
//   if (isSuccess) {
//     return <div>{data.message}</div>;
//   }
// }
