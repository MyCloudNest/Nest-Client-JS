
# Nest-Client-JS

`Nest-Client-JS` is a JavaScript library for interacting with the **Nest-Server** file server. The library provides simple interfaces for uploading, deleting, and fetching files using REST API.

---

## Features
- **Upload files** with the ability to add a name and description.
- **Delete files** using the File ID.
- **Fetch files** with an option to display them inline or download them.
- Written in TypeScript for strong type support.

---

## Requirements
- **Node.js** v14 or higher.
- **Nest-Server**: The server must be running.
- **Axios**: Installed as part of the library.

---

## Installation

You can install the library using npm or bun:

```bash
npm install nest-client-js
```

Or using bun:

```bash
bun add nest-client-js
```

---

## Usage

### 1. **Initialize the Client**

```typescript
import NestClient from "nest-client-js";

const client = new NestClient("http://localhost:3000");
```

### 2. **Upload a File**

```typescript
const file = new File(["Hello, World!"], "example.txt");
const response = await client.upload(file, "example.txt", "Description for the file");
console.log(response);
```

### 3. **Delete a File**

```typescript
const fileId = "your-file-id";
const response = await client.delete(fileId);
console.log(response);
```

### 4. **Fetch a File**

```typescript
const fileId = "your-file-id";
const response = await client.get(fileId, true); // Download the file
console.log(response);
```

---

## Running the Nest-Server

To run the local **Nest-Server**:

1. Ensure **Go** is installed on your machine.
2. Clone the project:

   ```bash
   git clone https://github.com/MyCloudNest/Nest-Server.git
   cd Nest-Server
   ```

3. Build and run the server:

   ```bash
   go build -o nest-server
   ./nest-server
   ```

4. The server will now be running at `http://localhost:3000`.

---

## Contribution

Contributions are welcome! Open a Pull Request or an Issue on the [Nest-Client-JS GitHub Repository](https://github.com/MyCloudNest/Nest-Client-JS).

---

## License

Licensed under the MIT License.
