import { useSession, signIn, signOut } from "next-auth/react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function Home() {
  const { data: session } = useSession();

  console.log({ session });

  if (session) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <p>Welcome: {session.user.email}</p>
        <div style={{ maxWidth: "25%", wordWrap: "break-word" }}>
          <p style={{ fontSize: "12px", textAlign: "center" }}>
            Check the console for Session details or use the buttons below
          </p>
        </div>

        {/* When Testing APIs I just need the dang JWT... */}
        <CopyToClipboard
          style={{
            margin: "3em",
            padding: "3em",
            width: "25%",
          }}
          text={session?.id_token || "no-token-found"}
          onCopy={() => console.log("Copied JWT to clipboard")}
        >
          <button>Copy JWT</button>
        </CopyToClipboard>

        <CopyToClipboard
          style={{
            margin: "3em",
            padding: "3em",
            width: "25%",
          }}
          text={session?.accessToken || "no-token-found"}
          onCopy={() => console.log("Copied Access Token to clipboard")}
        >
          <button>Copy Access Token</button>
        </CopyToClipboard>

        <div style={{ margin: "3em" }}>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "500px",
      }}
    >
      <button
        style={{ width: "25%", padding: "3em" }}
        onClick={() => signIn("google")}
      >
        Sign In
      </button>
    </div>
  );
}
