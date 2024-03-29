![image](https://github.com/solid-lite/draft-spec/assets/65864/d9b22bad-de6c-4f8a-97ec-827b1caafa56)

Version 0.0.1 `draft` `author:melvincarvalho`

## Solid-Lite Protocol Overview

### 1. Introduction

Building a decentralized web grounded in [Social Linked Data](https://solid.mit.edu/) principles aims to shift the paradigm of data ownership and collaborative innovation. For this ecosystem to flourish, it is crucial to develop a protocol that not only aligns with the core values of developers but also simplifies adoption and integration into existing workflows

Presenting Solid-Lite. Grounded in the tenets of Social Linked Data, this protocol offers a balance of elegance and potency. Conceived for expansive adaptability, Solid-Lite caters to a myriad of applications, from safeguarding personal records to powering intricate collaborative platforms. Its design aims to make the complexities of decentralized data accessible, providing tools that empower developers to craft solutions which prioritize user autonomy and innovation.

### 2. Hypertext Transfer Protocol (HTTP)

#### 2.1 HTTP Server

- Servers MUST conform to HTTP/1.1 Message Syntax and Routing [[RFC7230](https://solidproject.org/TR/protocol#bib-rfc7230)] and HTTP/1.1 Semantics and Content [[RFC7231](https://solidproject.org/TR/protocol#bib-rfc7231)].

- Servers MUST conform to HTTP/1.1 Conditional Requests [[RFC7232](https://solidproject.org/TR/protocol#bib-rfc7232)]. Servers SHOULD conform to HTTP/1.1 Caching [[RFC7234](https://solidproject.org/TR/protocol#bib-rfc7234)].

#### 2.2 HTTP Client

- Clients MUST conform to HTTP/1.1 Message Syntax and Routing [[RFC7230](https://solidproject.org/TR/protocol#bib-rfc7230)] and HTTP/1.1 Semantics and Content [[RFC7231](https://solidproject.org/TR/protocol#bib-rfc7231)].

- Clients MAY conform to HTTP/1.1 Conditional Requests [[RFC7232](https://solidproject.org/TR/protocol#bib-rfc7232)]. Clients MAY conform to HTTP/1.1 Caching [[RFC7234](https://solidproject.org/TR/protocol#bib-rfc7234)].

### 3. Uniform Resource Identifier (URI)

Clients and servers SHOULD conform to the Uniform Resource Identifier (URI) and Internationalized Resource Identifier (IRI) specifications to ensure consistent identification and referencing of resources. The URI provides a simple and extensible means for identifying a resource, while the IRI extends the URI to allow the use of characters from the Universal Character Set (UCS) [[RFC3987](https://solidproject.org/TR/protocol#bib-rfc3987)]. This adherence promotes interoperability and a consistent experience across the Solid-Lite ecosystem.

### 4. Resources

- Auxiliary Resources: Supporting resources that augment or describe primary resources are delivered through HTTP headers

### 5. Reading and Writing Resources

5.1 Reading

- Servers MUST support the HTTP GET, HEAD and OPTIONS methods [RFC7231] for clients to read resources or to determine communication options
  
5.2 Writing

- Servers MUST support the HTTP PUT and DELETE methods [RFC7231]

### 6. Cross-Origin Resource Sharing (CORS)

Solid applications seamlessly integrate data from disparate sources. However, web browsers, by default, adhere to the Same-Origin Policy, restricting requests to different domains for security reasons. This precaution, vital for preventing malicious data retrieval, can inadvertently restrict legitimate Solid applications. The following headers on the server will allow cross origins requests.

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,HEAD,OPTIONS,PUT,DELETE,POST
Access-Control-Allow-Headers: Content-Type
```

### 7. Identity

- WebID: An WebID is a URI that denotes an Agent. When dereferencing a WebID, it should return machine readable data, which can be used to discover other data, by following your nose (FYN). See below for and example. JSON-LD 1.1 is supported. The profile SHOULD live at the root level of the storage, giving a human friendly URL for sharing.

### 8. Authentication

- Authentication is the process of verifying a WebID. This can either be null auth, done using PKI, or with a bearer token.
- The WebID is returned to the server on successful authentication. The authentication process will return a user URI to the server. There will be multiple authentication strategies suppored similar to passportjs.
- Implementers much choose the following 3 modes of operation: testing, single-user, multi-user, which operates as a layered authentication ladder.

  8.1 Null Auth (Testing)

- The Null Auth approach is for testing only while building a server. Everyone can read and write. Null Auth MUST NOT be used in production.

  8.2 Bearer Auth (Single-User Mode)

- Bearer Auth is a shared SOLID_API_KEY that is sent in an `Authorization: Bearer ${SOLID_API_KEY}` header. If not presesnt the server MUST return a 401. Bearer Auth MUST be implemented in single user compliant solid lite servers, and given to the server on startup.

  8.3 PKI Auth (Multi User Mode)

- A simple PKI solution similar to that used in [SolidOS](https://github.com/SolidOS/solid-ui/blob/main/src/chat/keys.ts), where a signed header is sent to the server and verified, will be a base line example that implementers SHOULD support. For now signing the current unix timestamp and sendign it in an `Auth: solid-lite` header is sufficient. The server checks the timestamp is withing 60s of the current time. PKI MUST be implmented in the more complex multi-user solid lite scenario.

### 9. Authorization

- Auth Lite: The default authorization policy is that everyone can read, only the owner can write. If access is not granted HTTP 401 (I dont know who you are) or HTTP 403 (I know who you are but you do not have access) should be returned.

## Appendix A: Example JSON Profile with Links

All resources should be represented in a clear and structured JSON format. JSON provides an easy-to-understand format that can be quickly parsed and read by both humans and machines. This is based on JSON-LD 1.1. A lite version compatible with ActivityPub may be developed in future, but for now a simple profile, located at the base of storage could be as described below.

Example of a Resource JSON, loosely combines the W3C WebID Community Group [Draft](https://w3c.github.io/WebID/working_documents/webid-core-jacopo.html), [Solid lite WebID definitions](https://solid-lite.github.io/WebID/spec/identity/), [Schema.org](https://developers.google.com/search/updates#february-2024) and [ActivityPub](https://www.w3.org/TR/activitypub/):

```json
{
  "@context": [
    "https://www.w3.org/ns/activitystreams",
    "http://w3id.org/webid"
  ],
  "@id": "#me",
  "type": "Person",
  "mainEntityOfPage": "",
  "name": "Alyssa P. Hacker",
  "preferredUsername": "alyssa",
  "summary": "Lisp enthusiast hailing from MIT",
  "inbox": "https://social.example/alyssa/inbox/",
  "outbox": "https://social.example/alyssa/outbox/",
  "followers": "https://social.example/alyssa/followers/",
  "following": "https://social.example/alyssa/following/",
  "liked": "https://social.example/alyssa/liked/",
  "img": "avatar.png",
  "knows": "http://alice.example/#me",
  "storage": "/",
  "nostr": "nostr:pubkey:abcd0123456789"
}
```


In this example:

- @id provides a unique ID for the resource.
- @type indicates the type of resource.
- other fields describe the data in JSON-LD

Using JSON with links allows for a clear structure while also providing a way to navigate between related resources in the Solid-Lite ecosystem.

## Appendix B: **CRUD Operations Summary with HTTP Responses:**

- **CREATE:** Adds a new resource. Client provides content; system responds with `201 Created` on success, confirming the creation.

- **READ:** Retrieves resource(s) information. Client requests details; system responds with `200 OK` if resource(s) available, or `404 Not Found` if not.

- **UPDATE:** Modifies an existing resource. Client submits changes; system responds with `200 OK` or `204 No Content` upon successful update, indicating the resource has been modified.

- **DELETE:** Removes a resource. Client specifies target; system responds with `200 OK` or `204 No Content` if deletion is successful, or `404 Not Found` if the resource doesn't exist.

## Extending Solid Lite

Solid Lite is extended via Solid Lite Implementations Propsosals ([SLIPs](https://solid-lite.github.io/slips/))
